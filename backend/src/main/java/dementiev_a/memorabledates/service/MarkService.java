package dementiev_a.memorabledates.service;

import dementiev_a.memorabledates.data.entities.Date;
import dementiev_a.memorabledates.data.entities.Event;
import dementiev_a.memorabledates.data.entities.Mark;
import dementiev_a.memorabledates.data.entities.Photo;
import dementiev_a.memorabledates.data.repository.EventRepository;
import dementiev_a.memorabledates.data.repository.MarkRepository;
import dementiev_a.memorabledates.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class MarkService {
    public static final String ENTITY_NAME = "Mark";

    private final MarkRepository markRepository;
    private final EventRepository eventRepository;
    private final DateService dateService;
    private final PhotoService photoService;

    @Transactional
    public void createMark(long eventId, String name, String description, String place, String stringDate) {
        Date date = dateService.getOrCreateDate(stringDate);
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException(EventService.ENTITY_NAME, String.valueOf(eventId)));
        markRepository.save(new Mark(name, description, place, date, event));
    }

    public Mark getMark(long id) {
        return markRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(id)));
    }

    @Transactional
    public void updateMark(Long id, String name, String description, String place, String stringDate) {
        Mark mark = markRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(id)));
        Date date = dateService.getOrCreateDate(stringDate);
        mark.setName(name);
        mark.setDescription(description);
        mark.setPlace(place);
        mark.setDate(date);
        markRepository.save(mark);
    }

    @Transactional
    public void uploadPhoto(Long markId, MultipartFile file) throws IOException {
        Mark mark = markRepository.findById(markId)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(markId)));

        Photo photo = photoService.saveFile(file);
        photo.setMark(mark);
        photo = photoService.savePhoto(photo);
        mark.getPhotos().add(photo);
        markRepository.save(mark);
    }

    public void deleteMark(Long id) {
        Mark mark = markRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, String.valueOf(id)));
        markRepository.delete(mark);
    }
}
