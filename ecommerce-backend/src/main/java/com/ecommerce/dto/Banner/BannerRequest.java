package com.ecommerce.dto.Banner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class BannerRequest {
    String imgUrl;

    String link;

    LocalDate startDate;

    LocalDate endDate;

    Integer priority;

    Boolean isActive;
}
