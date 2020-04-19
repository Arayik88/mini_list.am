package am.project.service;

import am.project.domain.UserEntity;
import am.project.dto.user.UserInfoDTO;
import am.project.dto.user.UserRegistrationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<UserInfoDTO> findAllUsers(Pageable pageable);

    Page<UserInfoDTO> searchByName(String fullName, Pageable pageable);

    UserEntity findByMail(String mail);

    UserInfoDTO findById(Long id);

    void remove(Long id);

    void update(UserInfoDTO user);

    void register(UserRegistrationDto user);

    Long getMe();
}
