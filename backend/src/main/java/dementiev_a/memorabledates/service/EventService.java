package dementiev_a.memorabledates.service;

import dementiev_a.memorabledates.data.entities.Date;
import dementiev_a.memorabledates.data.entities.Event;
import dementiev_a.memorabledates.data.entities.Photo;
import dementiev_a.memorabledates.data.repository.EventRepository;
import dementiev_a.memorabledates.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EventService {
    public static final String ENTITY_NAME = "Event";

    private final EventRepository eventRepository;
    private final PhotoService photoService;
    private final DateService dateService;

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(id)));
    }

    public void createEvent(String name, String description, String stringDate) {
        Date date = dateService.getOrCreateDate(stringDate);
        Event event = new Event(name, description, date);
        eventRepository.save(event);
    }

    @Transactional
    public void editEvent(Long id, String name, String description, String stringDate) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(id)));
        event.setName(name);
        event.setDescription(description);
        Date date = dateService.getOrCreateDate(stringDate);
        event.setDate(date);
        eventRepository.save(event);
    }

    @Transactional
    public void uploadPhoto(Long eventId, MultipartFile file) throws IOException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(eventId)));

        Photo photo = photoService.saveFile(file);
        photo.setEvent(event);
        photo = photoService.savePhoto(photo);
        event.getPhotos().add(photo);
        eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(id)));
        eventRepository.delete(event);
    }
}
