package com.crawler.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.crawler.backend.dto.RecordRequestDto;
import com.crawler.backend.dto.RecordResponseDto;

public interface RecordService {
    List<RecordResponseDto> getRecords(Sort sort);

    RecordResponseDto create(RecordRequestDto recordRequestDto);

    RecordResponseDto updateRecord(Long recordId, RecordRequestDto recordRequestDto);

    String deleteRecord(Long recordId);

    RecordResponseDto getRecord(Long recordId);
}
