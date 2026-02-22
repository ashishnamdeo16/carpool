package com.statecarpool.service;

import com.statecarpool.dto.UpdateMeRequest;
import com.statecarpool.dto.UserDto;
import com.statecarpool.entity.User;
import com.statecarpool.exception.ResourceNotFoundException;
import com.statecarpool.mapper.DtoMapper;
import com.statecarpool.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getMe(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return DtoMapper.toUserDto(user);
    }

    public UserDto updateMe(Long userId, UpdateMeRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Optional.ofNullable(req.firstName()).ifPresent(user::setFirstName);
        Optional.ofNullable(req.lastName()).ifPresent(user::setLastName);
        Optional.ofNullable(req.phone()).ifPresent(user::setPhone);
        Optional.ofNullable(req.avatarUrl()).ifPresent(user::setAvatarUrl);
        user = userRepository.save(user);
        return DtoMapper.toUserDto(user);
    }

    public User getEntity(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
