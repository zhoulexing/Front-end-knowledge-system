
export function getAuthority() {
    return localStorage.getItem('cloud-chart-authority') || 'admin';
}

export function setAuthority(authority) {
    return localStorage.setItem('cloud-chart-authority', authority);
}
