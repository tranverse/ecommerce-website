package com.ecommerce.service;

import com.ecommerce.dto.auth.*;
import com.ecommerce.dto.customer.CustomerRequest;
import com.ecommerce.dto.customer.CustomerResponse;
import com.ecommerce.enums.CustomerTire;
import com.ecommerce.enums.ErrorCode;
import com.ecommerce.exception.AppException;
import com.ecommerce.mapper.CustomerMapper;
import com.ecommerce.model.Customer;
import com.ecommerce.model.Employee;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.EmployeeRepository;
import com.ecommerce.util.JwtUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    final CustomerRepository customerRepository;
    final CustomerMapper customerMapper;
    final PasswordEncoder passwordEncoder;
    final EmployeeRepository employeeRepository;
    final JwtUtil jwtUtil;

    public CustomerResponse addCustomer(CustomerRequest customerRequest) {
        if(customerRepository.existsByEmail(customerRequest.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED, HttpStatus.CONFLICT);
        }
        Customer customer = new Customer();
        String hashedPassword = passwordEncoder.encode(customerRequest.getPassword());
        customer.setName(customerRequest.getName());
        customer.setEmail(customerRequest.getEmail());
        customer.setPhone(customerRequest.getPhone());
        customer.setTire(CustomerTire.STANDARD);
        customer.setPassword(hashedPassword);
        customerRepository.save(customer);

        return customerMapper.toCustomerResponse(customer);
    }


    public AuthCustomerResponse customerLogin(AuthCustomerLoginRequest customerLoginRequest){
        Customer customer = customerRepository.findByEmail(customerLoginRequest.getEmail()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
        );
        if(!passwordEncoder.matches(customerLoginRequest.getPassword(), customer.getPassword())){
            throw  new AppException(ErrorCode.WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
        }
        String token = jwtUtil.generateToken(customer.getEmail(), customer.getId(), customerLoginRequest.getType(), "CUSTOMER");
        return new AuthCustomerResponse(token, customer);

    }

    public Employee addEmployee(EmployeeRequest employeeRequest) {
        if(employeeRepository.existsByEmail(employeeRequest.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED, HttpStatus.CONFLICT);
        }
        String hashedPassword = passwordEncoder.encode(employeeRequest.getPassword());
        Employee employee = new Employee();
        employee.setName(employeeRequest.getName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setPhone(employeeRequest.getPhone());
        employee.setRole(employeeRequest.getRole());
        employee.setPassword(hashedPassword);
        employeeRepository.save(employee);
        return employee;
    }

    public AuthEmployeeResponse employeeLogin(AuthCustomerLoginRequest loginRequest) {
        Employee employee = employeeRepository.findByEmail(loginRequest.getEmail()).orElseThrow(
                () -> new AppException(ErrorCode.EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND)
        );
        if(!passwordEncoder.matches(loginRequest.getPassword(), employee.getPassword())){
            throw  new AppException(ErrorCode.WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtil.generateToken(employee.getEmail(), employee.getId(), loginRequest.getType(), String.valueOf(employee.getRole()));
        EmployeeResponse employeeResponse = new EmployeeResponse();
        employeeResponse.setName(employee.getName());
        employeeResponse.setEmail(employee.getEmail());
        employeeResponse.setPhone(employee.getPhone());
        employeeResponse.setRole(employee.getRole());
        employeeResponse.setAvatar(employee.getAvatar());

        return new AuthEmployeeResponse(token, employeeResponse);
    }

}
