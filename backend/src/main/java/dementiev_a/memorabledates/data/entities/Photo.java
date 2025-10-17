package dementiev_a.memorabledates.data.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity(name = "Photos")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Photo {
    @Id
    private String filename;

    @ManyToOne
    private Event event;

    @ManyToOne
    private Mark mark;
}
