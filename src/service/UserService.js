import axios from '../axios-backend';

const isAdmin = () => {
    return getIsAdmin();
}

const getToken = () => {
    return localStorage.getItem("token");
}

const getIsAdmin = () => {
    const userObj = getUserObject();

    if(userObj === null || userObj.isAdmin === null) {
        return false;
    }

    return userObj.isAdmin;
}

const getUserObject = () => {
    const user = localStorage.getItem("user");
    if (user === "") {
        return "";
    }

    return JSON.parse(user);
}

const getUsername = () => {
    const userObj = getUserObject();

       if (userObj === null || userObj.username === null || userObj.username === "") {
            return "";
       }

       return userObj.username;
}

const isAuthenticated = () => {
   return localStorage.getItem("isLoggedIn")
}

const logout = () => {
    const username = getUsername();
    if (username === "") {
        return;
    }
    axios.get(`/logout?name=${username}`)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        alert(err);
    })

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

export default isAuthenticated;
export {
    logout,
    getUsername,
    isAdmin,
    getToken,
}