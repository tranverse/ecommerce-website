export function NumberFomart(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

export function DateTimeFormat(date) {
    if (!date) return '';
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(date));
}
