package com.statecarpool.controller;

import com.statecarpool.dto.UpdateMeRequest;
import com.statecarpool.dto.UserDto;
import com.statecarpool.service.UserService;
import com.statecarpool.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(name = "Me", description = "Current user profile")
public class MeController {

    private final UserService userService;

    public MeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user")
    public ResponseEntity<UserDto> getMe() {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.getMe(userId));
    }

    @PutMapping("/me")
    @Operation(summary = "Update current user")
    public ResponseEntity<UserDto> updateMe(@Valid @RequestBody UpdateMeRequest req) {
        Long userId = SecurityUtil.getCurrentUserId();
        return ResponseEntity.ok(userService.updateMe(userId, req));
    }
}
