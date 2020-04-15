package am.project.api.impl;

import am.project.api.UserController;
import am.project.dto.user.UserInfoDTO;
import am.project.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users/")
public class UserControllerImpl implements UserController {

    private UserService userService;

    public UserControllerImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    @GetMapping("all")
    public Page<UserInfoDTO> findAllUsers(@PageableDefault Pageable pageable) {
        return userService.findAllUsers(pageable);
    }

    @Override
    @GetMapping("search")
    public Page<UserInfoDTO> searchByName(@RequestParam String fullName, @PageableDefault Pageable pageable) {

        return userService.searchByName(fullName, pageable);
    }

    @Override
    @DeleteMapping("delete/{id}")
    public void remove(@PathVariable Long id) {
        userService.remove(id);
    }

    @Override
    @PutMapping("update")
    public void update(@RequestBody UserInfoDTO user) {

    }
}
