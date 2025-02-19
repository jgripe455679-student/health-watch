package com.crawler.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private final long accessTokenDurationMinute;
    private final long accessTokenDurationSecond;
    private final long refreshTokenDurationDay;
    private final long refreshTokenDurationSecond;

    private final String accessCookieName;
    private final String refreshCookieName;
}
