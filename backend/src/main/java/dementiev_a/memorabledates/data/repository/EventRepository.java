package dementiev_a.memorabledates.data.repository;

import dementiev_a.memorabledates.data.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
