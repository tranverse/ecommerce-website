package com.ecommerce.service;

import com.ecommerce.dto.Banner.BannerRequest;
import com.ecommerce.model.Banner;
import com.ecommerce.repository.BannerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BannerService {
    final BannerRepository bannerRepository;
    public Banner addBanner(BannerRequest bannerRequest) {
        Banner banner = new Banner();
        banner.setLink(bannerRequest.getLink());
        banner.setPriority(bannerRequest.getPriority());
        banner.setImgUrl(bannerRequest.getImgUrl());
        banner.setEndDate(bannerRequest.getEndDate());
        banner.setStartDate(bannerRequest.getStartDate());
        bannerRepository.save(banner);
        return banner;
    }

    public List<Banner> getBannersInTime(){
        List<Banner> banners = bannerRepository.findAll();
        return banners.stream().filter(
                banner -> (( banner.getStartDate().isBefore(LocalDate.now()) || banner.getStartDate().isEqual(LocalDate.now()))
                ) && (banner.getEndDate().isAfter( LocalDate.now()) || banner.getEndDate().isEqual(LocalDate.now()))
        ).toList();


    }
}
