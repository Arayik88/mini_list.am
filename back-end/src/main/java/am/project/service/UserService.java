package am.project.service;

import am.project.domain.UserEntity;
import am.project.dto.user.UserInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<UserInfoDTO> findAllUsers(Pageable pageable);

    Page<UserInfoDTO> searchByName(String fullName, Pageable pageable);

    UserEntity findByMail(String mail);

    void remove(Long id);

    void update(UserInfoDTO user);
}
