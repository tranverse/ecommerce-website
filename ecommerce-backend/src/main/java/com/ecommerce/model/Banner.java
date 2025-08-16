package com.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String imgUrl;

    String link;

    @DateTimeFormat(pattern = "dd-MM-YYYY")
    LocalDate startDate;

    @DateTimeFormat(pattern = "dd-MM-YYYY")
    LocalDate endDate;

    Boolean active;

    Integer priority;

}
