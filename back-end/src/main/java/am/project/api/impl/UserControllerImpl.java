package am.project.api.impl;

import am.project.api.UserController;
import am.project.dto.user.UserInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class UserControllerImpl implements UserController {
    @Override
    public Page<UserInfoDTO> findAllUsers() {
        return null;
    }

    @Override
    public Page<UserInfoDTO> searchByName(String text, Pageable pageable) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public void update(UserInfoDTO user) {

    }
}
