package dementiev_a.memorabledates.service;

import dementiev_a.memorabledates.data.entities.Date;
import dementiev_a.memorabledates.data.repository.DateRepository;
import dementiev_a.memorabledates.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DateService {
    private static final int PAGE_SIZE = 10;

    private final DateRepository dateRepository;

    public Page<Date> getDates(int pageNumber, String fromDate, String toDate) {
        Pageable pageable = PageRequest.of(
                pageNumber - 1,
                PAGE_SIZE,
                Sort.by("date").descending()
        );
        if (fromDate != null && toDate != null) {
            LocalDate from = LocalDate.parse(fromDate, DateUtils.FORMATTER);
            LocalDate to = LocalDate.parse(toDate, DateUtils.FORMATTER);
            return dateRepository
                    .findByDateIsGreaterThanEqualAndDateIsLessThanEqualAndEventsIsNotEmpty(from, to, pageable);
        } else if (fromDate != null) {
            LocalDate from = LocalDate.parse(fromDate, DateUtils.FORMATTER);
            return dateRepository.findByDateIsGreaterThanEqualAndEventsIsNotEmpty(from, pageable);
        } else if (toDate != null) {
            LocalDate to = LocalDate.parse(toDate, DateUtils.FORMATTER);
            return dateRepository.findByDateIsLessThanEqualAndEventsIsNotEmpty(to, pageable);
        }
        return dateRepository.findByEventsIsNotEmpty(pageable);
    }

    protected Date getOrCreateDate(String stringDate) {
        LocalDate localDate = LocalDate.parse(stringDate, DateUtils.FORMATTER);
        Date date = dateRepository.findByDate(localDate);
        if (date == null) {
            return dateRepository.save(new Date(localDate));
        }
        return date;
    }
}
