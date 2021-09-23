import axios from 'axios';
import Cookies from 'js-cookie';

// 1258 - Backend
// 3328 - Frontend
//
// 4586 - Total
 
export const signupUser = async (userName, emailAddress, password) => {

    let data = new FormData();
    data.append("userName", userName);
    data.append("emailAddress", emailAddress);
    data.append("password", password);

    const response = await axios({
        method: "post",
        url: "/auth/signup",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get("csrftoken"),
        }
    })

    return response;
}


export const loginUser = async (emailAddress, password) => {

    let data = new FormData();
    data.append("emailAddress", emailAddress);
    data.append("password", password);

    const response = await axios({
        method: "post",
        url: "/auth/login",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get("csrftoken"),
        }
    })

    return response;
}

export const isLoggedIn = async () => {

    const response = await axios({
        method: "post",
        url: "/auth/isLoggedIn",
        headers: {
            "X-CSRFTOKEN": Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const logOutUser = async () => {

    const response = await axios({
        method: "post",
        url: "/auth/logout",
        headers: {
            "X-CSRFTOKEN": Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const SendChangePasswordLink = async (emailAddress) => {

    const data = new FormData();
    data.append("emailAddress", emailAddress);

    const response = await axios({
        method: "post",
        url: "/auth/sendChangePasswordLink",
        data: data,
        headers: {
            "X-CSRFTOKEN": Cookies.get('csrftoken'),
        } 
    })
    return response;
}