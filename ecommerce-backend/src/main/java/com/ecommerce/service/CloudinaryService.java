package com.ecommerce.service;

import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.config.CloudinaryConfig;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CloudinaryService {
    final CloudinaryConfig cloudinaryConfig;
    public String getFolder(String type) {
        String folder = cloudinaryConfig.folder;

        return String.format("%s/%s", folder, type);

    }

    public String upLoadSingleImage(MultipartFile file) throws IOException {
        var result = cloudinaryConfig.cloudinary().uploader()
                .upload(file.getBytes(), ObjectUtils.asMap(
                        "folder", getFolder("product")
                ));
        return (String) result.get("secure_url");
    }

    public List<Map<String, String>> upLoadMultiImages(String colorsJson, List<MultipartFile> files) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<String> colors = mapper.readValue(colorsJson, new TypeReference<List<String>>() {});
        List<Map<String, String>> results = new ArrayList<>();
        for (int i = 0; i < colors.size(); i++) {
            MultipartFile file = files.get(i);
            String color = colors.get(i);
            var result = cloudinaryConfig.cloudinary().uploader()
                    .upload(file.getBytes(), ObjectUtils.asMap(
                            "folder", getFolder("product")
                    ));
            Map<String, String> map = new HashMap<>();
            map.put("color", color);
            map.put("url", result.get("secure_url").toString());
            results.add(map);
        }
        return results;
    }

}
