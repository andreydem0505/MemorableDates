package dementiev_a.memorabledates.dto.responses;

import java.util.List;

public record MarkResponse(
        long eventId,
        String name,
        String description,
        String place,
        String date,
        List<String> photos
) {
}
