package dementiev_a.memorabledates.dto.responses;

import java.util.List;

public record DatesResponse(
        int totalPages,
        long totalDates,
        int currentPage,
        List<DateResponse> result
) {
}
