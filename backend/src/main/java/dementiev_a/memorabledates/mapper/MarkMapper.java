package dementiev_a.memorabledates.mapper;

import dementiev_a.memorabledates.data.entities.Mark;
import dementiev_a.memorabledates.data.entities.Photo;
import dementiev_a.memorabledates.dto.responses.MarkPreviewResponse;
import dementiev_a.memorabledates.dto.responses.MarkResponse;
import dementiev_a.memorabledates.utils.DateUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkMapper {
    public List<MarkPreviewResponse> toMarkPreviewResponse(List<Mark> marks) {
        return marks.stream()
                .map(this::toMarkPreviewResponse)
                .toList();
    }

    public MarkPreviewResponse toMarkPreviewResponse(Mark mark) {
        return new MarkPreviewResponse(
                mark.getId(),
                mark.getName()
        );
    }

    public MarkResponse toMarkResponse(Mark mark) {
        List<String> photoFilenames = mark.getPhotos().stream()
                .map(Photo::getFilename)
                .toList();

        return new MarkResponse(
                mark.getEvent().getId(),
                mark.getName(),
                mark.getDescription(),
                mark.getPlace(),
                DateUtils.FORMATTER.format(mark.getDate().getDate()),
                photoFilenames
        );
    }
}
