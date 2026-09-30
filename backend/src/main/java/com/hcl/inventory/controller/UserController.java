package com.hcl.inventory.controller;

import com.hcl.inventory.entity.User;
import com.hcl.inventory.repository.UserRepository;
import com.hcl.inventory.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            user.setPassword(null); // Never return password hash
            return ResponseEntity.ok(new ApiResponse<>(true, "User profile fetched", user));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(new ApiResponse<>(true, "Users fetched", users));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(Authentication authentication, @RequestBody User updatedUser) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            user.setEmail(updatedUser.getEmail());
            user.setFullName(updatedUser.getFullName());
            user.setPhone(updatedUser.getPhone());
            user.setAddress(updatedUser.getAddress());
            userRepository.save(user);
            user.setPassword(null);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated", user));
        }
        return ResponseEntity.badRequest().body(new ApiResponse<>(false, "User not found", null));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> request) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setStatus(request.get("status"));
            userRepository.save(user);
            user.setPassword(null);
            return ResponseEntity.ok(new ApiResponse<>(true, "User status updated", user));
        }
        return ResponseEntity.notFound().build();
    }
}

