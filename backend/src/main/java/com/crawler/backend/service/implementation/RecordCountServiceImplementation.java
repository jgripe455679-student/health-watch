package com.crawler.backend.service.implementation;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.RecordCount;
import com.crawler.backend.model.RecordCountAnalytics;
import com.crawler.backend.service.RecordCountService;

@Service
public class RecordCountServiceImplementation implements RecordCountService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final StringRedisTemplate stringRedisTemplate;

    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public RecordCountServiceImplementation(RedisTemplate<String, Object> redisTemplate,
            StringRedisTemplate stringRedisTemplate) {
        this.redisTemplate = redisTemplate;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<RecordCount> getAllRecordCount() {
        ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
        Object obj = valOps.get("record_count");
        if (obj instanceof List) {
            List<RecordCount> records = (List<RecordCount>) obj;
            return records.stream()
                    .sorted(Comparator.comparing(r -> LocalDate.parse(r.getRecordDate(), fmt)))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public List<RecordCount> getAllRecordCountByDateRange(List<RecordCount> records, String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate, fmt);
        LocalDate end = LocalDate.parse(endDate, fmt);

        return records.stream()
                .filter(record -> {
                    LocalDate recordDate = LocalDate.parse(record.getRecordDate(), fmt);
                    return (recordDate.isEqual(start) || recordDate.isAfter(start)) &&
                            (recordDate.isEqual(end) || recordDate.isBefore(end));
                })
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<RecordCountAnalytics> getRecordCountAnalytics() {
        ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
        Object obj = valOps.get("record_count_descriptive_analytics");
        if (obj instanceof List) {
            List<RecordCountAnalytics> records = (List<RecordCountAnalytics>) obj;
            return records.stream()
                    .sorted(Comparator.comparing(record -> LocalDate.parse(record.getRecordDate(), fmt),
                            Comparator.reverseOrder()))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public String getRecordCountDescription() {
        ValueOperations<String, String> valOps = stringRedisTemplate.opsForValue();
        return valOps.get("record_count_descriptive_analytics:description");
    }

    @Override
    public Map<String, Object> getDescriptiveAnalytics() {
        Map<String, Object> descriptive_analytics = new HashMap<String, Object>();
        descriptive_analytics.put("analytics", getRecordCountAnalytics());
        descriptive_analytics.put("description", getRecordCountDescription());
        return descriptive_analytics;
    }

}
