package com.statecarpool.service;

import com.statecarpool.dto.*;
import com.statecarpool.entity.User;
import com.statecarpool.exception.BadRequestException;
import com.statecarpool.mapper.DtoMapper;
import com.statecarpool.repository.UserRepository;
import com.statecarpool.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new BadRequestException("Email already registered");
        }
        User user = new User();
        user.setEmail(req.email());
        user.setPasswordHash(passwordEncoder.encode(req.password()));
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        user.setPhone(req.phone());
        user = userRepository.save(user);
        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, DtoMapper.toUserDto(user));
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(String.valueOf(user.getId()), req.password())
        );
        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return new AuthResponse(token, DtoMapper.toUserDto(user));
    }
}
