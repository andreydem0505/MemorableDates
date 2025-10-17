package dementiev_a.memorabledates.dto.responses;

import java.util.List;

public record EventResponse(
        String name,
        String description,
        String date,
        List<String> photos,
        List<MarkPreviewResponse> marks
) {
}
