package com.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String code;

    private String description;

    private Integer quantity;

    private Date startDate;

    private Date endDate;

    private Boolean isPublic;

    private BigDecimal value;

    private Integer maxUsage;

    private BigDecimal minOrderAmount;



}
