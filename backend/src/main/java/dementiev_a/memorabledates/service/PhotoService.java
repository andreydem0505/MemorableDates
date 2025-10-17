package dementiev_a.memorabledates.service;

import dementiev_a.memorabledates.data.entities.Photo;
import dementiev_a.memorabledates.data.repository.PhotoRepository;
import dementiev_a.memorabledates.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotoService {
    public static final String ENTITY_NAME = "Photo";
    
    private final PhotoRepository photoRepository;

    @Value("${photo.storage.path:photos}")
    private String photoStoragePath;

    @Transactional
    public void deletePhoto(String filename) throws IOException {
        Photo photo = photoRepository.findById(filename)
                .orElseThrow(() -> new EntityNotFoundException(ENTITY_NAME, filename));

        Path filePath = getPhotoPath(filename);
        if (Files.exists(filePath)) {
            Files.delete(filePath);
        }

        photoRepository.delete(photo);
    }

    public Resource getPhotoResource(String filename) {
        Path filePath = getPhotoPath(filename);

        if (!Files.exists(filePath)) {
            throw new EntityNotFoundException(ENTITY_NAME, filename);
        }

        return new FileSystemResource(filePath);
    }

    public String getPhotoContentType(String filename) throws IOException {
        Path filePath = getPhotoPath(filename);

        if (!Files.exists(filePath)) {
            throw new EntityNotFoundException(ENTITY_NAME, filename);
        }

        String contentType = Files.probeContentType(filePath);
        return contentType != null ? contentType : "application/octet-stream";
    }

    protected Photo savePhoto(Photo photo) {
        return photoRepository.save(photo);
    }

    protected Photo saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        Path storageDir = Paths.get(photoStoragePath);
        if (!Files.exists(storageDir)) {
            Files.createDirectories(storageDir);
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String filename = UUID.randomUUID() + fileExtension;

        Path filePath = storageDir.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Photo photo = new Photo();
        photo.setFilename(filename);

        return photoRepository.save(photo);
    }

    private Path getPhotoPath(String filename) {
        return Paths.get(photoStoragePath).resolve(filename);
    }
}
