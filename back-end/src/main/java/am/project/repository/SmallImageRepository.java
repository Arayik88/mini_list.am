package am.project.repository;

import am.project.domain.SmallImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SmallImageRepository extends JpaRepository<SmallImageEntity, Long> {
}
