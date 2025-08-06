package com.ecommerce.controller;

import com.cloudinary.Cloudinary;
import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.customer.CustomerResponse;
import com.ecommerce.service.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CloudinaryController {
    final Cloudinary cloudinary;
    final CloudinaryService cloudinaryService;

    @PostMapping("/multi")
    public ResponseEntity<ApiResponse<List<Map<String, String>>>> uploadMultiImages(@RequestParam  List<MultipartFile> files,
                                                                               @RequestParam  String colors) throws IOException {
        return ResponseEntity.ok(
                ApiResponse.<List<Map<String, String>>>builder()
                        .message("Add new customer")
                        .data(cloudinaryService.upLoadMultiImages(colors, files))
                        .code("Images-s-upload")
                        .build()
        );
    }

    @PostMapping("/single")
    public ResponseEntity<ApiResponse<String>> uploadSingleImages(@RequestParam  MultipartFile file) throws IOException {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .message("Add new customer")
                        .data(cloudinaryService.upLoadSingleImage(file))
                        .code("Image-s-upload")
                        .build()
        );
    }
}
