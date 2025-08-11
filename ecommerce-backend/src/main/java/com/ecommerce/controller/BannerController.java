package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.Banner.BannerRequest;
import com.ecommerce.model.Banner;
import com.ecommerce.service.BannerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/banner")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class BannerController {
    final BannerService bannerService;
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<Banner>> addBanner(@RequestBody BannerRequest banner) {
        return ResponseEntity.ok(
                ApiResponse.<Banner>builder()
                        .message("Add banner successfully")
                        .data(bannerService.addBanner(banner))
                        .code("Banner-s-add")
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Banner>>> getBanner() {
        return ResponseEntity.ok(
                ApiResponse.<List<Banner>>builder()
                        .message("Add banner successfully")
                        .data(bannerService.getBannersInTime())
                        .code("Banner-s-add")
                        .build()
        );
    }
}
