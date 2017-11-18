
export default function logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
}