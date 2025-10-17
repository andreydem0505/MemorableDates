package dementiev_a.memorabledates.dto.responses;

import java.util.List;

public record DateResponse(
        String date,
        List<EventPreviewResponse> events
) {
}
