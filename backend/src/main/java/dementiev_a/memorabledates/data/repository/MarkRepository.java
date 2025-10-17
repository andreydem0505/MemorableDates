package dementiev_a.memorabledates.data.repository;

import dementiev_a.memorabledates.data.entities.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {
}
