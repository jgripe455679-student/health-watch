package com.crawler.test;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {
    RabbitAutoConfiguration.class,
    RedisAutoConfiguration.class
})
@EntityScan(basePackages = "com.crawler.backend.model")
@EnableJpaRepositories(basePackages = "com.crawler.backend.repository")
public class TestApplication {

}