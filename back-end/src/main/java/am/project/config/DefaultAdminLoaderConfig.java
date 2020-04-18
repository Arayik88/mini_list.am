package am.project.config;

import am.project.domain.UserEntity;
import am.project.domain.util.UserRole;
import am.project.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DefaultAdminLoaderConfig implements ApplicationRunner {

    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public DefaultAdminLoaderConfig(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

        String mail = "admin@admin.com";

        Optional<UserEntity> temp = userRepository.findByMail(mail);

        if(!temp.isPresent()){
            UserEntity admin = new UserEntity();

            admin.setActive(true);
            admin.setMail(mail);
            admin.setFirstName("admin");
            admin.setLastName("admin");
            admin.setPassword(passwordEncoder.encode("11111111"));
            admin.getRoles().add(UserRole.ROLE_ADMIN);
            admin.getRoles().add(UserRole.ROLE_USER);
            userRepository.save(admin);
        }
    }
}
