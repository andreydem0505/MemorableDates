package dementiev_a.memorabledates.dto.requests;

public record EventEditRequest(
        Long id,
        String name,
        String description,
        String date
) {
}
