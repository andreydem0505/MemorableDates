package dementiev_a.memorabledates.dto.requests;

public record MarkEditRequest(
        String name,
        String description,
        String place,
        String date
) {
}
