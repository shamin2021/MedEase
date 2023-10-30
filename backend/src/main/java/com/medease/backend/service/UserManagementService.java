package com.medease.backend.service;

import com.medease.backend.Exception.CustomException;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.UserDTO;
import com.medease.backend.entity.User;
import com.medease.backend.enumeration.Role;
import com.medease.backend.repository.HLCRepository;
import com.medease.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final UserRepository userRepository;
    private final HLCRepository hlcRepository;

    public List<UserDTO> getAllUsers() {
        System.out.println(userRepository.retrieveUserList());
        List<Object[]> users = userRepository.retrieveUserList();
        List<UserDTO> userDTOList = new ArrayList<>();

        for (Object[] user : users){
            UserDTO userDTO = convertToUserDto(user);
            userDTOList.add(userDTO);
        }
        return userDTOList;
    }

    // to convert each user to a userDTO
    private UserDTO convertToUserDto(Object[] user) {

        var userId = (Integer) user[0];
        var hlcName = hlcRepository.findHLCNameByUserId(userId);

            return UserDTO.builder()
                    .id((Integer) user[0])
                    .firstname((String) user[1])
                    .lastname((String) user[2])
                    .hlc_name(hlcName)
                    .email((String) user[3])
                    .mobileNumber((String) user[4])
                    .activated((Boolean) user[5])
                    .enabled((Boolean) user[6])
                    .role((Role) user[7])
                    .build();
    }

    // to enable/disable users
    public GlobalResponseDTO manageUser(Integer id, Boolean enabled) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("No User With the ID given"));

        user.setEnabled(enabled);
        userRepository.save(user);

        if(enabled){
            return GlobalResponseDTO.builder()
                    .status(200)
                    .message("Successfully Enabled the User")
                    .build();
        }
        else{
            return GlobalResponseDTO.builder()
                    .status(200)
                    .message("Successfully Disabled the User")
                    .build();
        }
    }
}
