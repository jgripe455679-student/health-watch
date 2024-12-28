package com.crawler.backend.mapper;

import java.util.stream.Collectors;

import com.crawler.backend.dto.RecordRequestDto;
import com.crawler.backend.dto.RecordResponseDto;
import com.crawler.backend.model.Record;
import com.crawler.backend.model.Service;

public class RecordMapper {
    public static RecordResponseDto recordToRecordResponseDto(Record record) {
        return new RecordResponseDto(
                record.getId(),
                record.getRecordDate(),
                record.getProfileType(),
                record.getProfile().getId(),
                record.getProfile().toString(),
                record.getDepartment().getName(),
                record.getDepartment().getServices().stream().map(Service::toString).collect(Collectors.toSet()),
                record.getHeight(),
                record.getWeight(),
                record.getBloodPressure(),
                record.getCreatedAt(),
                record.getCreatedBy().getUsername(),
                record.getUpdatedAt(),
                record.getUpdatedBy() != null ? record.getUpdatedBy().getUsername() : null);
    }

    public static Record recordRequestDtoToRecord(RecordRequestDto recordRequestDto) {
        Record record = new Record();
        record.setProfileType(recordRequestDto.profileType());
        record.setHeight(recordRequestDto.height());
        record.setWeight(recordRequestDto.weight());
        record.setBloodPressure(recordRequestDto.bloodPressure());
        return record;
    }
}
