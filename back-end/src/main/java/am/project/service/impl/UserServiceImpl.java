package am.project.service.impl;

import am.project.domain.UserEntity;
import am.project.dto.user.UserInfoDTO;
import am.project.repository.UserRepository;
import am.project.service.UserService;
import am.project.service.util.exception.UserNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Page<UserInfoDTO> findAllUsers(Pageable pageable) {

        Page<UserEntity> users = userRepository.findAll(pageable);

        return users.map(UserInfoDTO::mapFromEntity);
    }

    @Override
    public Page<UserInfoDTO> searchByName(String fullName, Pageable pageable) {

        String[] firstNameAndLastName = fullName.split(" ");
        if(firstNameAndLastName.length > 1){
            return userRepository.searchByName(firstNameAndLastName[0], firstNameAndLastName[1],
                    pageable).map(UserInfoDTO::mapFromEntity);
        }
        return userRepository.searchByName(fullName, fullName, pageable).map(UserInfoDTO::mapFromEntity);
    }

    @Override
    public UserEntity findByMail(String mail) {
        Optional<UserEntity> byMail = userRepository.findByMail(mail);

        UserEntity user = null;

        if(byMail.isPresent()){
            user = byMail.get();
        }

        return user;
    }

    @Override
    public void remove(Long id) {

        Optional<UserEntity> byId = userRepository.findById(id);
        if(byId.isPresent()){
           userRepository.deleteById(id);
        }

        else {
            throw new UserNotFoundException(id);
        }
    }

    @Override
    public void update(UserInfoDTO user) {

        Optional<UserEntity> byId = userRepository.findById(user.getId());
        if(byId.isPresent()){
            UserEntity userEntity = byId.get();
            user.toEntity(userEntity);
            userRepository.save(userEntity);
        }

        else {
            throw new UserNotFoundException(user.getId());
        }
    }
}
