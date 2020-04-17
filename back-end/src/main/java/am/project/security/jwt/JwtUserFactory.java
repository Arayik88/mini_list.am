package am.project.security.jwt;

import am.project.domain.UserEntity;
import am.project.domain.util.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public final class JwtUserFactory {

    public static JwtUser create(UserEntity user) {

        return new JwtUser(user.getId(), user.getMail(), user.getFirstName(), user.getLastName(),
                user.getPassword(), user.getActive(), mapToGrantedAuthorities(user.getRoles()));
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(Set<UserRole> userRoles) {
        return userRoles.stream()
                .map(userRole -> new SimpleGrantedAuthority(userRole.name()))
                .collect(Collectors.toList());
    }
}
