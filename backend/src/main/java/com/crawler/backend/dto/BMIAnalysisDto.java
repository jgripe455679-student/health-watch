package com.crawler.backend.dto;

import java.io.Serializable;

public record BMIAnalysisDto(String bmiCategory, Long recordCount, Double percentage) implements Serializable {

}
