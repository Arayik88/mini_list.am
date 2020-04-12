package am.project.api;

import am.project.domain.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserController {

    Page<UserEntity> findAllUsers();

    Page<UserEntity> searchByName(String text, Pageable pageable);

    void remove(Long id);

    void update(UserEntity user);

}
