const Logout = () => {
    localStorage.clear();
    window.location.reload();
    return null;
}

export default Logout
