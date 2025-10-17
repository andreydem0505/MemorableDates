package dementiev_a.memorabledates.controller;

import dementiev_a.memorabledates.data.entities.Date;
import dementiev_a.memorabledates.dto.responses.DatesResponse;
import dementiev_a.memorabledates.mapper.DateMapper;
import dementiev_a.memorabledates.service.DateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dates")
@RequiredArgsConstructor
public class DateController {
    private final DateService dateService;
    private final DateMapper dateMapper;

    @GetMapping
    public DatesResponse getAllDates(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate
    ) {
        Page<Date> result = dateService.getDates(page, fromDate, toDate);
        return dateMapper.toDatesResponse(result);
    }
}
