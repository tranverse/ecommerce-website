package com.ecommerce.service;

import com.ecommerce.dto.Banner.BannerRequest;
import com.ecommerce.enums.ErrorCode;
import com.ecommerce.exception.AppException;
import com.ecommerce.model.Banner;
import com.ecommerce.repository.BannerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
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
    Boolean checkIsActive(LocalDate startDate, LocalDate endDate) {
        return (startDate.isBefore(LocalDate.now()) || startDate.isEqual(LocalDate.now()))
                && (endDate.isAfter(LocalDate.now()) || endDate.isEqual(LocalDate.now()));
    }
    public Banner addBanner(BannerRequest bannerRequest) {
        Banner banner = new Banner();
        banner.setLink(bannerRequest.getLink());
        banner.setPriority(bannerRequest.getPriority());
        banner.setImgUrl(bannerRequest.getImgUrl());
        banner.setEndDate(bannerRequest.getEndDate());
        banner.setStartDate(bannerRequest.getStartDate());
        banner.setActive(checkIsActive(bannerRequest.getStartDate(), bannerRequest.getEndDate()));
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

    public List<Banner> getAllBanners(){
        return bannerRepository.findAll();
    }

    public Banner getBannerById(String id){
        return bannerRepository.findById(id).orElseThrow( () -> new AppException(ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    public Banner updateBanner(String id, BannerRequest bannerRequest) {
        Banner banner = bannerRepository.findById(id).orElseThrow( () -> new AppException(ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND));
        banner.setLink(bannerRequest.getLink());
        banner.setPriority(bannerRequest.getPriority());
        if(bannerRequest.getImgUrl() != null){
            banner.setImgUrl(bannerRequest.getImgUrl());
        }
        banner.setEndDate(bannerRequest.getEndDate());
        banner.setStartDate(bannerRequest.getStartDate());
        banner.setActive(bannerRequest.getIsActive());
        bannerRepository.save(banner);
        return banner;
    }
}
