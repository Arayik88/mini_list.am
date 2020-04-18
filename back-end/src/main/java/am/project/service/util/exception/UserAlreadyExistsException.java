package am.project.service.util.exception;

public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String userName) {
        super("User with email " + userName + " already exists.");
    }
}
