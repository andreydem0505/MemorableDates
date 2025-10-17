package dementiev_a.memorabledates.data.repository;

import dementiev_a.memorabledates.data.entities.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, String> {
}