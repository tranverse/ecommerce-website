package com.ecommerce.enums;

import lombok.Getter;

@Getter
public enum ErrorCode {

    USER_EXITED(100, "User đã tồn tại"),
    WRONG_PASSWORD(101, "Sai mật khẩu"),
    USER_NOT_FOUND(102, "Không tìm thấy user"),
    EMAIL_EXISTED(103, "Email đã tồn tại"),
    EMPLOYEE_EXISTED(104, "Nhân viên đã tồn tại"),
    EMAIL_NOT_FOUND(105, "Không tìm thấy email"),
    EMPLOYEE_NOT_EXISTED(106, "Nhân viên không tồn tại"),
    NOT_FOUND(107, "Không tìm thấy"),
    VOUCHER_EXISTED(108, "Voucher đã tồn tại"),
    INVALID_PASSWORD(109, "Mật khẩu cũ không khớp"),
    SAME_PASSWORD(110, "Mật khẩu mới trùng với mật khẩu cũ"),
    OUT_OF_STOCK(111, "Sản phẩm đã hết hàng"),
    NOT_ENOUGH_QUANTITY(112, "Số lượng sản phẩm còn lại không đủ");







    private final int code;
    private final String message;
    ErrorCode(int code, String message){
        this.code = code;
        this.message = message;
    }

}
