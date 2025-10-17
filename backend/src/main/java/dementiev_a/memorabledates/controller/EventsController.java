package dementiev_a.memorabledates.controller;

import dementiev_a.memorabledates.data.entities.Event;
import dementiev_a.memorabledates.dto.requests.EventCreateRequest;
import dementiev_a.memorabledates.dto.requests.EventEditRequest;
import dementiev_a.memorabledates.dto.responses.EventResponse;
import dementiev_a.memorabledates.mapper.EventMapper;
import dementiev_a.memorabledates.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventsController {
    private final EventService eventService;
    private final EventMapper eventMapper;

    @GetMapping("/{id}")
    public EventResponse getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return eventMapper.toEventResponse(event);
    }

    @PostMapping
    public void createEvent(@RequestBody EventCreateRequest request) {
        eventService.createEvent(request.name(), request.description(), request.date());
    }

    @PutMapping
    public void updateEvent(@RequestBody EventEditRequest request) {
        eventService.editEvent(request.id(), request.name(), request.description(), request.date());
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    @PostMapping("/{eventId}/photos")
    public ResponseEntity<?> uploadPhoto(
            @PathVariable Long eventId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            eventService.uploadPhoto(eventId, file);
            return ResponseEntity.ok().body(Map.of("message", "Photo uploaded successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to save photo"));
        }
    }
}
