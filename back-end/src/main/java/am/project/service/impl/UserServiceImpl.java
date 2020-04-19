package am.project.service.impl;

import am.project.domain.UserEntity;
import am.project.domain.util.UserRole;
import am.project.dto.user.UserInfoDTO;
import am.project.dto.user.UserRegistrationDto;
import am.project.repository.UserRepository;
import am.project.security.jwt.JwtUser;
import am.project.service.UserService;
import am.project.service.util.exception.UserAlreadyExistsException;
import am.project.service.util.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
    public UserInfoDTO findById(Long id) {
        Optional<UserEntity> byId = userRepository.findById(id);

        UserEntity user = null;

        if(byId.isPresent()){
            user = byId.get();
        }

        return user == null ? null : UserInfoDTO.mapFromEntity(user);
    }

    @Override
    @Transactional
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
    @Transactional
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

    @Override
    @Transactional
    public void register(UserRegistrationDto user) {

        Optional<UserEntity> byMail = userRepository.findByMail(user.getMail());
        if(byMail.isPresent()){
            throw new UserAlreadyExistsException(user.getMail());
        }

        UserEntity userEntity = user.toEntity();
        userEntity.getRoles().add(UserRole.ROLE_USER);
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(userEntity);

    }

    @Override
    public Long getMe() {

        return ((JwtUser)SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getId();
    }
}
