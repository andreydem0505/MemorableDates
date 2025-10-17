package dementiev_a.memorabledates.dto.requests;

public record EventCreateRequest(
        String name,
        String description,
        String date
) {
}
