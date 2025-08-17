package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.Banner.BannerRequest;
import com.ecommerce.dto.Statistic.StatisticResponse;
import com.ecommerce.model.Banner;
import com.ecommerce.service.StatisticService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistic")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class StatisticController {
    final StatisticService statisticService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<StatisticResponse>> updateBanner() {
        return ResponseEntity.ok(
                ApiResponse.<StatisticResponse>builder()
                        .message("Update banner successfully")
                        .data(statisticService.getDashboardStats())
                        .code("Banner-s-update")
                        .build()
        );
    }
}
