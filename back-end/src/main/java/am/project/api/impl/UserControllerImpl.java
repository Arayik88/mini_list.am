package am.project.api.impl;

import am.project.api.UserController;
import am.project.domain.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class UserControllerImpl implements UserController {
    @Override
    public Page<UserEntity> findAllUsers() {
        return null;
    }

    @Override
    public Page<UserEntity> searchByName(String text, Pageable pageable) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public void update(UserEntity user) {

    }
}
