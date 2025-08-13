package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.Employee.EmployeeRequest;
import com.ecommerce.dto.Employee.EmployeeResponse;
import com.ecommerce.model.Employee;
import com.ecommerce.service.EmployeeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class EmployeeController {
    final EmployeeService employeeService;
//    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/get-roles")
    public ResponseEntity<ApiResponse<List<String>>> getEmployeeRoles(){
        return ResponseEntity.ok(
                ApiResponse.<List<String>>builder()
                        .message("Get roles successfully")
                        .data(employeeService.getEmployeeRole())
                        .code("Employee-s-get-role")
                        .build()
        );
    }

    @GetMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    public ResponseEntity<ApiResponse<EmployeeResponse>> getEmployeeById(@PathVariable  String employeeId){
        return ResponseEntity.ok(
                ApiResponse.<EmployeeResponse>builder()
                        .message("Get employee successfully")
                        .data(employeeService.getEmployeeById(employeeId))
                        .code("Employee-s-get-role")
                        .build()
        );
    }
    @GetMapping("/get-all")
    public ResponseEntity<ApiResponse<List<EmployeeResponse>>> getAllEmployees(){
        return ResponseEntity.ok(
                ApiResponse.<List<EmployeeResponse>>builder()
                        .message("Get all employee successfully")
                        .data(employeeService.getAllEmployee())
                        .code("Employee-s-get-all")
                        .build()
        );
    }

    @PostMapping("/add-employee")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<EmployeeResponse>> addEmployee(@RequestBody EmployeeRequest employeeRequest) {
        return ResponseEntity.ok(
                ApiResponse.<EmployeeResponse>builder()
                        .message("Add new employee successfully")
                        .data(employeeService.addEmployee(employeeRequest))
                        .code("Employee-s-add")
                        .build()
        );
    }

    @PutMapping("/update-employee/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<EmployeeResponse>> addEmployee(@RequestBody EmployeeRequest employeeRequest,
                                                                     @PathVariable String employeeId) {
        return ResponseEntity.ok(
                ApiResponse.<EmployeeResponse>builder()
                        .message("Update employee successfully")
                        .data(employeeService.updateEmployee(employeeId, employeeRequest))
                        .code("Employee-s-update")
                        .build()
        );
    }


}
