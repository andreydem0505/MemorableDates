package dementiev_a.memorabledates.mapper;

import dementiev_a.memorabledates.data.entities.Event;
import dementiev_a.memorabledates.data.entities.Photo;
import dementiev_a.memorabledates.dto.responses.EventResponse;
import dementiev_a.memorabledates.dto.responses.MarkPreviewResponse;
import dementiev_a.memorabledates.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventMapper {
    private final MarkMapper markMapper;

    public EventResponse toEventResponse(Event event) {
        List<String> photos = event.getPhotos().stream()
                .map(Photo::getFilename)
                .toList();

        List<MarkPreviewResponse> marks = markMapper.toMarkPreviewResponse(event.getMarks());

        return new EventResponse(
                event.getName(),
                event.getDescription(),
                DateUtils.FORMATTER.format(event.getDate().getDate()),
                photos,
                marks
        );
    }
}
