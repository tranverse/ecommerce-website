package com.ecommerce.mapper;

import com.ecommerce.dto.Employee.EmployeeRequest;
import com.ecommerce.dto.Employee.EmployeeResponse;
import com.ecommerce.model.Employee;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    EmployeeResponse toEmployeeResponse(Employee employee);

    List<EmployeeResponse> toEmployeeResponseList(List<Employee> employees);

    Employee toEmployee(EmployeeRequest employeeRequest);
}
