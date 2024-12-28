package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.RecordRequestDto;
import com.crawler.backend.dto.RecordResponseDto;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.mapper.RecordMapper;
import com.crawler.backend.model.Department;
import com.crawler.backend.model.Profile;
import com.crawler.backend.model.Record;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.DepartmentRepository;
import com.crawler.backend.repository.ProfileRepository;
import com.crawler.backend.repository.RecordRepository;
import com.crawler.backend.repository.UserRepository;
import com.crawler.backend.service.RecordService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordServiceImplementation implements RecordService {

        private final RecordRepository recordRepository;
        private final ProfileRepository profileRepository;
        private final UserRepository userRepository;
        private final DepartmentRepository departmentRepository;

        @Override
        public List<RecordResponseDto> getRecords(Sort sort) {
                return recordRepository.findAll(sort).stream().map(RecordMapper::recordToRecordResponseDto)
                                .collect(Collectors.toList());
        }

        @Override
        public RecordResponseDto create(RecordRequestDto recordRequestDto) {

                Record record = RecordMapper.recordRequestDtoToRecord(recordRequestDto);

                Profile profile = profileRepository
                                .findProfile(recordRequestDto.lastName(),
                                                recordRequestDto.firstName(),
                                                recordRequestDto.middleName(), recordRequestDto.suffix())
                                .orElseThrow(
                                                () -> new ResourceNotFoundException("Profile not found"));

                Department department = departmentRepository.findByName(recordRequestDto.department()).orElseThrow(
                                () -> new ResourceNotFoundException("Department not found"));

                User user = userRepository.findByUsername(recordRequestDto.createdBy()).orElseThrow(
                                () -> new ResourceNotFoundException("User not found"));

                record.setProfile(profile);
                record.setDepartment(department);
                record.setCreatedBy(user);

                return RecordMapper.recordToRecordResponseDto(recordRepository.save(record));
        }

        @Override
        public RecordResponseDto updateRecord(Long recordId, RecordRequestDto recordRequestDto) {
                Record record = recordRepository.findById(recordId).orElseThrow(
                                () -> new ResourceNotFoundException("Record not found"));

                Profile profile = profileRepository
                                .findProfile(
                                                recordRequestDto.lastName(),
                                                recordRequestDto.firstName(),
                                                recordRequestDto.middleName(), recordRequestDto.suffix())
                                .orElseThrow(
                                                () -> new ResourceNotFoundException("Profile not found"));

                Department department = departmentRepository.findByName(recordRequestDto.department()).orElseThrow(
                                () -> new ResourceNotFoundException("Department not found"));

                User updatedBy = userRepository.findByUsername(recordRequestDto.updatedBy()).orElseThrow(
                                () -> new ResourceNotFoundException("User not found"));

                record.setProfileType(recordRequestDto.profileType());
                record.setProfile(profile);
                record.setDepartment(department);
                record.setHeight(recordRequestDto.height());
                record.setWeight(recordRequestDto.weight());
                record.setBloodPressure(recordRequestDto.bloodPressure());
                record.setUpdatedBy(updatedBy);

                return RecordMapper.recordToRecordResponseDto(recordRepository.save(record));
        }

        @Override
        public String deleteRecord(Long recordId) {
                Record record = recordRepository.findById(recordId).orElseThrow(
                                () -> new ResourceNotFoundException("Record not found"));

                recordRepository.delete(record);
                return String.format("Record with %s deleted successfully", recordId);
        }

        @Override
        public RecordResponseDto getRecord(Long recordId) {
                Record record = recordRepository.findById(recordId).orElseThrow(
                                () -> new ResourceNotFoundException("Record not found"));
                return RecordMapper.recordToRecordResponseDto(record);
        }
}
