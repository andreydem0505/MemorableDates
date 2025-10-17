package dementiev_a.memorabledates.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String entity, String id) {
        super(String.format("%s %s was not found", entity, id));
    }
}
