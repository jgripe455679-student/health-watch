package com.crawler.backend.mapper;

import com.crawler.backend.dto.RecordRequestDto;
import com.crawler.backend.dto.RecordResponseDto;
import com.crawler.backend.model.Record;

public class RecordMapper {
    public static RecordResponseDto recordToRecordResponseDto(Record record) {
        return new RecordResponseDto(
                record.getId(),
                record.getRecordDate(),
                record.getProfile().getId(),
                record.getProfile().toString(),
                record.getService().getName(),
                record.getHeight(),
                record.getWeight(),
                record.getBloodPressure(),
                record.getPulseRate(),
                record.getHealthCondition(),
                record.getMedicalProblem(),
                record.getDiagnosis(),
                record.getMedication(),
                record.getNotes(),
                record.getCreatedAt(),
                record.getCreatedBy().getUsername(),
                record.getUpdatedAt(),
                record.getUpdatedBy() != null ? record.getUpdatedBy().getUsername() : null);
    }

    public static Record recordRequestDtoToRecord(RecordRequestDto recordRequestDto) {
        Record record = new Record();
        record.setHeight(recordRequestDto.height());
        record.setWeight(recordRequestDto.weight());
        record.setBloodPressure(recordRequestDto.bloodPressure());
        record.setPulseRate(recordRequestDto.pulseRate());
        record.setHealthCondition(recordRequestDto.healthCondition());
        record.setMedicalProblem(recordRequestDto.medicalProblem());
        record.setDiagnosis(recordRequestDto.diagnosis());
        record.setMedication(recordRequestDto.medication());
        record.setNotes(recordRequestDto.notes());
        return record;
    }
}
