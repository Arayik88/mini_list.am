package am.project.dto.user;

import am.project.domain.UserEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
public class UserRegistrationDto {

    private String mail;
    private String password;
    private String firstName;
    private String lastName;

    public UserEntity toEntity(){
        UserEntity user = new UserEntity();

        user.setMail(this.mail);
        user.setLastName(this.lastName);
        user.setFirstName(this.firstName);

        return user;
    }
}
