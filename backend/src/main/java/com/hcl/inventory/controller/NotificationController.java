package com.hcl.inventory.controller;

import com.hcl.inventory.entity.Notification;
import com.hcl.inventory.service.NotificationService;
import com.hcl.inventory.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getUserNotifications(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Notifications fetched", notifications));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> payload) {
        Long userId = payload.get("userId") != null ? Long.valueOf(payload.get("userId").toString()) : null;
        String title = (String) payload.get("title");
        String message = (String) payload.get("message");
        String type = (String) payload.get("type");
        String priority = (String) payload.get("priority");
        String relatedModule = (String) payload.get("relatedModule");
        Long relatedId = payload.get("relatedId") != null ? Long.valueOf(payload.get("relatedId").toString()) : null;
        String actionUrl = (String) payload.get("actionUrl");

        Notification n = notificationService.createNotification(userId, title, message, type, priority, relatedModule, relatedId, actionUrl);
        return ResponseEntity.ok(new ApiResponse<>(true, "Created", n));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Notification n = notificationService.markAsRead(id);
        if (n != null) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Marked read", n));
        }
        return ResponseEntity.notFound().build();
    }
}
