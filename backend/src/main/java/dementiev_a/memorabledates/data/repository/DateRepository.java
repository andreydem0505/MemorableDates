package dementiev_a.memorabledates.data.repository;

import dementiev_a.memorabledates.data.entities.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface DateRepository extends JpaRepository<Date, LocalDate> {
    Page<Date> findByEventsIsNotEmpty(Pageable pageable);
    Page<Date> findByDateIsGreaterThanEqualAndEventsIsNotEmpty(LocalDate fromDate, Pageable pageable);
    Page<Date> findByDateIsLessThanEqualAndEventsIsNotEmpty(LocalDate toDate, Pageable pageable);
    Page<Date> findByDateIsGreaterThanEqualAndDateIsLessThanEqualAndEventsIsNotEmpty(
            LocalDate fromDate,
            LocalDate toDate,
            Pageable pageable
    );
    Date findByDate(LocalDate date);
}
