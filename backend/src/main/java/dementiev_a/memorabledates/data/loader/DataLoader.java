package dementiev_a.memorabledates.data.loader;

import dementiev_a.memorabledates.data.entities.Date;
import dementiev_a.memorabledates.data.entities.Event;
import dementiev_a.memorabledates.data.repository.DateRepository;
import dementiev_a.memorabledates.data.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    private final EventRepository eventRepository;
    private final DateRepository dateRepository;

    @Value("${load.initial.data:false}")
    private boolean loadInitialData;

    @Override
    public void run(String... args) {
        if (loadInitialData) {
            reloadData();
        }
    }

    private void reloadData() {
        System.out.println("Deleting data");
        eventRepository.deleteAll();

        System.out.println("Loading initial data...");
        List<Event> events = new ArrayList<>();
        List<Date> dates = new ArrayList<>();

        try (Scanner scanner = new Scanner(new File("initial_data.csv"))) {
            while (scanner.hasNextLine()) {
                String[] line = scanner.nextLine().split("\t");
                String date = line[0];
                String name = line[1];
                String description = line[2];
                Date dateModel = new Date(LocalDate.parse(date, dateTimeFormatter));
                dates.add(dateModel);
                events.add(new Event(name, description, dateModel));
            }
        } catch (FileNotFoundException e) {
            System.out.println("File with initial data not found");
        }

        dateRepository.saveAll(dates);
        eventRepository.saveAll(events);
    }
}
