package dementiev_a.memorabledates.dto.requests;

public record MarkCreateRequest(
        long eventId,
        String name,
        String description,
        String place,
        String date
) {
}
