package dementiev_a.memorabledates.mapper;

import dementiev_a.memorabledates.data.entities.Date;
import dementiev_a.memorabledates.data.entities.Event;
import dementiev_a.memorabledates.dto.responses.DateResponse;
import dementiev_a.memorabledates.dto.responses.DatesResponse;
import dementiev_a.memorabledates.dto.responses.EventPreviewResponse;
import dementiev_a.memorabledates.utils.DateUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DateMapper {
    public DatesResponse toDatesResponse(Page<Date> page) {
        List<DateResponse> dates = page.getContent().stream()
                .map(this::toDateResponse)
                .toList();
        return new DatesResponse(
                page.getTotalPages(),
                page.getTotalElements(),
                page.getNumber() + 1,
                dates
        );
    }

    private DateResponse toDateResponse(Date date) {
        return new DateResponse(
                DateUtils.FORMATTER.format(date.getDate()),
                toEventPreviewResponseList(date.getEvents())
        );
    }

    private List<EventPreviewResponse> toEventPreviewResponseList(List<Event> events) {
        return events.stream().map(event -> new EventPreviewResponse(
                event.getId(),
                event.getName()
        )).toList();
    }
}
