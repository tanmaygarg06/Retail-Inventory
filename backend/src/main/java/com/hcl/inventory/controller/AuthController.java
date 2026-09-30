package com.hcl.inventory.controller;

import com.hcl.inventory.dto.ApiResponse;
import com.hcl.inventory.dto.AuthRequest;
import com.hcl.inventory.dto.AuthResponse;
import com.hcl.inventory.entity.User;
import com.hcl.inventory.repository.UserRepository;
import com.hcl.inventory.security.JwtUtil;
import com.hcl.inventory.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;
import com.hcl.inventory.entity.Role;
import com.hcl.inventory.repository.RoleRepository;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (org.springframework.security.authentication.DisabledException | org.springframework.security.authentication.LockedException e) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, "Restricted by admin. Your account has been suspended.", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Incorrect username or password", null));
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", new AuthResponse(jwt)));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> payload) {
        String username = (String) payload.get("username");
        String password = (String) payload.get("password");
        String email = (String) payload.get("email");
        List<String> roleNames = (List<String>) payload.get("roles");
        
        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Username already exists", null));
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());
        
        java.util.Set<Role> roles = roleNames.stream().map(r -> roleRepository.findByName(r).orElse(null)).filter(r -> r != null).collect(Collectors.toSet());
        user.setRoles(roles);
        
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse<>(true, "User registered successfully", null));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = UUID.randomUUID().toString();
            String resetLink = "http://localhost:5173/reset-password?token=" + token;
            
            try {
                emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(new ApiResponse<>(false, "Failed to send email. Check SMTP setup.", null));
            }
            return ResponseEntity.ok(new ApiResponse<>(true, "Password reset link sent to " + email, null));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(true, "If that email exists, a reset link was sent.", null));
        }
    }
}
