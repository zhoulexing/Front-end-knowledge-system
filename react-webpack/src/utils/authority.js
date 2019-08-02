export function getAuthority() {
    return localStorage.getItem('user') || 'admin';
}

export function setAuthority(authority) {
    return localStorage.setItem('user', authority);
}
