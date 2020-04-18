package am.project.api;

import am.project.domain.UserEntity;
import am.project.domain.util.UserRole;
import am.project.dto.user.LoginDto;
import am.project.dto.user.UserRegistrationDto;
import am.project.security.jwt.JwtTokenProvider;
import am.project.service.UserService;
import am.project.service.util.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;

    @PostMapping("login")
    public String login(@RequestBody LoginDto loginDto){
        try {

            String mail = loginDto.getMail();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(mail, loginDto.getPassword()));

            UserEntity user = userService.findByMail(mail);
            if(user == null){
                throw new UserNotFoundException(mail);
            }

            return jwtTokenProvider.createToke(mail, new ArrayList<>(user.getRoles()));

        }catch (AuthenticationException e){
            throw new BadCredentialsException("Invalid email or password");
        }

    }

    @PostMapping("register")
    public void register(@RequestBody UserRegistrationDto user){

        userService.register(user);
    }
}
