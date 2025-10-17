package dementiev_a.memorabledates.data.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Dates")
@Getter
@Setter
public class Date {
    @Id
    private LocalDate date;

    @OneToMany(mappedBy = "date", cascade = CascadeType.ALL)
    private List<Event> events = new ArrayList<>();

    @OneToMany(mappedBy = "date", cascade = CascadeType.ALL)
    private List<Mark> marks = new ArrayList<>();

    public Date(LocalDate date) {
        this.date = date;
    }

    public Date() { }
}
