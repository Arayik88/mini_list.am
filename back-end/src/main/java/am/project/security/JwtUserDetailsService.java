package am.project.security;

import am.project.domain.UserEntity;
import am.project.security.jwt.JwtUser;
import am.project.security.jwt.JwtUserFactory;
import am.project.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserService userService;

    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }


    @Override
    public UserDetails loadUserByUsername(String mail) {

        UserEntity user = userService.findByMail(mail);

        if (user == null) {
            throw new UsernameNotFoundException("User with email: " + mail + " not found.");
        }

        JwtUser jwtUser = JwtUserFactory.create(user);

        return jwtUser;
    }
}
