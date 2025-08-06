package com.ecommerce.util;

import java.text.Normalizer;
import java.util.Random;

public class SlugUtil {

    public static String generateRandomNumber(){
        Random rand = new Random();
        int number = rand.nextInt(99000) + 1;
        return String.valueOf(number);
    }

    public static String toSlug(String input) {
        if(input == null || input.isEmpty()){
            return "";
        }

        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase()
                .replaceAll("[^a-zA-Z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-{2,}", "-")
                .replaceAll("^-|-$","");
    }
}
