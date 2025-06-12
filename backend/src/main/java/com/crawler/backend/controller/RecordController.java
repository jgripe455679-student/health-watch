package com.crawler.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.RecordRequestDto;
import com.crawler.backend.dto.RecordResponseDto;
import com.crawler.backend.service.RecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @GetMapping
    public ResponseEntity<List<RecordResponseDto>> getRecords() {
        List<RecordResponseDto> response = recordService.getRecords(Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RecordResponseDto> createRecord(@RequestBody RecordRequestDto recordRequestDto) {
        RecordResponseDto response = recordService.create(recordRequestDto);
        return ResponseEntity.created(URI.create("/api/v1/records/" + response.id())).body(response);
    }

    @PutMapping("/{recordId}")
    public ResponseEntity<RecordResponseDto> updateRecord(
            @PathVariable Long recordId,
            @RequestBody RecordRequestDto recordRequestDto) {
        RecordResponseDto response = recordService.updateRecord(recordId, recordRequestDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{recordId}")
    public ResponseEntity<?> deleteRecord(
            @PathVariable Long recordId) {
        String response = recordService.deleteRecord(recordId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{recordId}")
    public ResponseEntity<RecordResponseDto> getRecord(@PathVariable Long recordId) {
        RecordResponseDto response = recordService.getRecord(recordId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getRecordCount() {
        return ResponseEntity.ok(recordService.getRecordCount());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<RecordResponseDto>> getRecordsByDateRange(@RequestParam String startDate,
            @RequestParam String endDate) {
        if (startDate == null || startDate.trim().isEmpty() ||
                endDate == null || endDate.trim().isEmpty()) {
            throw new IllegalArgumentException("startDate and endDate must not be empty.");
        }
        List<RecordResponseDto> response = recordService.getRecordsByDateRange(startDate, endDate,
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(response);
    }

}
