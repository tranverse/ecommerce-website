package com.ecommerce.service;

import com.ecommerce.dto.Employee.EmployeeRequest;
import com.ecommerce.dto.Employee.EmployeeResponse;
import com.ecommerce.enums.EmployeeRole;
import com.ecommerce.enums.ErrorCode;
import com.ecommerce.exception.AppException;
import com.ecommerce.mapper.EmployeeMapper;
import com.ecommerce.model.Address;
import com.ecommerce.model.Employee;
import com.ecommerce.repository.AddressRepository;
import com.ecommerce.repository.EmployeeRepository;
import com.ecommerce.util.JwtUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmployeeService {
    final EmployeeRepository employeeRepository;
    final EmployeeMapper employeeMapper;
    final PasswordEncoder passwordEncoder;
    final AddressRepository addressRepository;

    final JwtUtil jwtUtil;
    public List<String> getEmployeeRole() {
        return Arrays.stream(EmployeeRole.values()).map(EmployeeRole::getValue).collect(Collectors.toList());
    }

    public List<EmployeeResponse> getAllEmployee(){
        List<Employee> employees = employeeRepository.findAll();
        return employeeMapper.toEmployeeResponseList(employees);
    }

    public EmployeeResponse getEmployeeById(String id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
           () ->   new AppException(ErrorCode.EMPLOYEE_NOT_EXISTED, HttpStatus.NOT_FOUND));

        return employeeMapper.toEmployeeResponse(employee);
    }

    public EmployeeResponse addEmployee(EmployeeRequest employeeRequest) {
        if(employeeRepository.existsByEmail(employeeRequest.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED, HttpStatus.CONFLICT);
        }
        System.out.println(employeeRequest.getEmail());
        Address address = new Address();
        address.setWard(employeeRequest.getAddress().getWard());
        address.setDistrict(employeeRequest.getAddress().getDistrict());
        address.setDetails(employeeRequest.getAddress().getDetails());
        address.setProvince(employeeRequest.getAddress().getProvince());
        addressRepository.save(address);

        String hashedPassword = passwordEncoder.encode(employeeRequest.getPassword());
        Employee employee = employeeMapper.toEmployee(employeeRequest);
        employee.setPassword(hashedPassword);
        employee.setAddress(address);
        employeeRepository.save(employee);
        return employeeMapper.toEmployeeResponse(employee);
    }


    public EmployeeResponse updateEmployee(String id, EmployeeRequest employeeRequest) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.EMPLOYEE_NOT_EXISTED, HttpStatus.NOT_FOUND)
        );
        Address address = employee.getAddress();
        address.setProvince(employeeRequest.getAddress().getProvince());
        address.setDistrict(employeeRequest.getAddress().getDistrict());
        address.setWard(employeeRequest.getAddress().getWard());
        address.setDetails(employeeRequest.getAddress().getDetails());
        employee.setAddress(address);

        employee.setEmail(employeeRequest.getEmail());
        employee.setAddress(employeeRequest.getAddress());
        employee.setRole(employeeRequest.getRole());
        employee.setPhone(employeeRequest.getPhone());
        employee.setName(employeeRequest.getName());
        employee.setAvatar(employeeRequest.getAvatar());
        employeeRepository.save(employee);
        return employeeMapper.toEmployeeResponse(employee);
    }
}
