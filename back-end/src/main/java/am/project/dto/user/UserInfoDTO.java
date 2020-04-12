package am.project.dto.user;

import am.project.domain.UserEntity;

public class UserInfoDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String mail;

    private String phone;

    private String[] roles;

    private Long imageId;

    public static UserInfoDTO mapFromEntity(UserEntity user){


        if(user != null) {

            UserInfoDTO userInfoDTO = new UserInfoDTO();

            userInfoDTO.id = user.getId();
            userInfoDTO.firstName = user.getFirstName();
            userInfoDTO.lastName = user.getLastName();
            userInfoDTO.mail = user.getMail();
            userInfoDTO.phone = user.getPhone();

            userInfoDTO.roles = (String[]) user.getRoles().stream().map(Enum::toString).toArray();

            userInfoDTO.imageId = user.getImage().getId();

            return userInfoDTO;
        }

        return null;
    }

    public UserEntity toEntity(){
        UserEntity user = new UserEntity();

        user.setId(this.id);
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setMail(this.mail);
        user.setPhone(this.phone);

        return user;
    }
}
