package dementiev_a.memorabledates.data.entities;

import dementiev_a.memorabledates.config.SpringContextHolder;
import dementiev_a.memorabledates.service.PhotoService;
import jakarta.persistence.*;
import lombok.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Events")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "events_generator")
    private Long id;

    @Column(nullable = false, length = 512)
    private String name;

    @Column(length = 2048)
    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "date")
    private Date date;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Mark> marks = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Photo> photos = new ArrayList<>();

    public Event(String name, String description, Date date) {
        this.name = name;
        this.description = description;
        this.date = date;
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
