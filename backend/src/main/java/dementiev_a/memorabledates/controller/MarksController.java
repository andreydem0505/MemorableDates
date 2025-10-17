package dementiev_a.memorabledates.controller;

import dementiev_a.memorabledates.data.entities.Mark;
import dementiev_a.memorabledates.dto.requests.MarkCreateRequest;
import dementiev_a.memorabledates.dto.requests.MarkEditRequest;
import dementiev_a.memorabledates.dto.responses.MarkResponse;
import dementiev_a.memorabledates.mapper.MarkMapper;
import dementiev_a.memorabledates.service.MarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/marks")
@RequiredArgsConstructor
public class MarksController {
    private final MarkService markService;
    private final MarkMapper markMapper;

    @PostMapping
    public void createMark(@RequestBody MarkCreateRequest request) {
        markService.createMark(
                request.eventId(),
                request.name(),
                request.description(),
                request.place(),
                request.date()
        );
    }

    @GetMapping("/{id}")
    public MarkResponse getMark(@PathVariable Long id) {
        Mark mark = markService.getMark(id);
        return markMapper.toMarkResponse(mark);
    }

    @PutMapping("/{id}")
    public void updateMark(@PathVariable Long id, @RequestBody MarkEditRequest request) {
        markService.updateMark(id, request.name(), request.description(), request.place(), request.date());
    }

    @DeleteMapping("/{id}")
    public void deleteMark(@PathVariable Long id) {
        markService.deleteMark(id);
    }

    @PostMapping("/{markId}/photos")
    public ResponseEntity<?> uploadPhoto(
            @PathVariable Long markId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            markService.uploadPhoto(markId, file);
            return ResponseEntity.ok().body(Map.of("message", "Photo uploaded successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to save photo"));
        }
    }
}
