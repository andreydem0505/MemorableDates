package dementiev_a.memorabledates.data.entities;

import dementiev_a.memorabledates.config.SpringContextHolder;
import dementiev_a.memorabledates.service.PhotoService;
import jakarta.persistence.*;
import lombok.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Marks")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "marks_generator")
    private long id;

    @Column(nullable = false, length = 512)
    String name;

    @Column(length = 2048)
    String description;

    String place;

    @ManyToOne(optional = false)
    @JoinColumn(name = "date")
    private Date date;

    @ManyToOne(optional = false)
    private Event event;

    @OneToMany(mappedBy = "mark", cascade = CascadeType.ALL)
    private List<Photo> photos = new ArrayList<>();

    public Mark(String name, String description, String place, Date date, Event event) {
        this.name = name;
        this.description = description;
        this.place = place;
        this.date = date;
        this.event = event;
    }

    @PreRemove
    private void preRemove() {
        PhotoService photoService = SpringContextHolder.getBean(PhotoService.class);

        photos.forEach(photo -> {
            try {
                photoService.deletePhoto(photo.getFilename());
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete photo " + photo.getFilename(), e);
            }
        });
    }
}
