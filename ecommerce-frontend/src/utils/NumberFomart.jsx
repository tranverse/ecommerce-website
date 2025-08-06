export function NumberFomart(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}
