package am.project.api;

import am.project.dto.user.UserInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserController {

    Page<UserInfoDTO> findAllUsers();

    Page<UserInfoDTO> searchByName(String text, Pageable pageable);

    void remove(Long id);

    void update(UserInfoDTO user);

}
