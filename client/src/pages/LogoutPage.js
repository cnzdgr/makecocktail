
function LogoutPage() {
    localStorage.removeItem('token');
    window.location="/";
}

export default LogoutPage;