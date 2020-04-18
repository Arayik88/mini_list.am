package am.project.api;

import am.project.dto.user.UserInfoDTO;
import am.project.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users/")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("all")
    @PreAuthorize(value = "hasAuthority('ROLE_ADMIN')")
    public Page<UserInfoDTO> findAllUsers(@PageableDefault Pageable pageable) {
        return userService.findAllUsers(pageable);
    }

    @GetMapping("search")
    public Page<UserInfoDTO> searchByName(@RequestParam String fullName, @PageableDefault Pageable pageable) {

        return userService.searchByName(fullName, pageable);
    }

    @DeleteMapping("delete/{id}")
    public void remove(@PathVariable Long id) {
        userService.remove(id);
    }

    @PutMapping("update")
    public void update(@RequestBody UserInfoDTO user) {

    }
}
