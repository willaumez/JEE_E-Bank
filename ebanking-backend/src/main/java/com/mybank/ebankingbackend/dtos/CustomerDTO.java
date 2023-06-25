package com.mybank.ebankingbackend.dtos;

import com.mybank.ebankingbackend.enums.RoleType;
import lombok.Data;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Data
@CrossOrigin("*")
public class CustomerDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private RoleType role;
}