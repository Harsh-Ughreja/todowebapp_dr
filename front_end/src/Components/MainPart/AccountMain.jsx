import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validatePassword, validateUserName } from '../JS/valiator';
import axios from 'axios';
import Cookies from 'js-cookie';
import { checkPassword, updatePassword, updateUserName } from '../ApiCall/appApi';

const backgroundColorOptions = {
    1: "#efefef",
    2: "cornflowerblue",
    3: "#00bcd4",
    4: "#4caf50",
    5: "#ffeb3b",
    6: "#2196f3",
    7: "#9c27b0",
    8: "#9e9e9e",
    9: "#795548",
    10: "#3f51b5",
    11: "rgb(234 82 156)",
}

export const AccountMain = (props) => {

    useEffect(() => {
        document.title = "Account | Wilstodo"
    }, []);

    const [backgroundColor, setBackgroundColor] = useState(backgroundColorOptions[Math.floor(Math.random() * 10) + 1]);

    return (
        <div>
            <AccountContent 
                setUserName={props.setUserName}
                themeStyle={props.themeStyle}
                setThemeStyle={props.setThemeStyle}
            />
            <div class="position-fixed w-100 h-100"
                style={{
                    zIndex: -1,
                    top: 0,
                    backgroundColor: backgroundColor
                }}>
            </div>
        </div>
    )
}

export const AccountContent = (props) => {

    const history = useHistory();
    const [newUserName, setNewUserName] = useState("");
    const [userNameChangeMode, setUserNameChangeMode] = useState(false);
    const [userData, setUserData] = useState('');

    const [error, setError] = useState('');

    useEffect(async () => {
        await axios({
            method: "post",
            url: "/app/get/accountDetail",
            headers: {
                'X-CSRFTOKEN': Cookies.get('csrftoken'),
            }
        })
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    setUserData(response_data.content);
                }
                else {
                    window.location = "/";
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const updateUsernameFunc = async (newUserName) => {

        const isValidUserName = validateUserName(newUserName);

        setError('');

        if (isValidUserName[0]) {
            await updateUserName(newUserName)
                .then((response) => {
                    const response_data = response.data;
                    if (response_data.authenticated) {
                        if (response_data.content.updated) {
                            setError('');
                            setUserNameChangeMode(false);
                            userData.user_name = newUserName;
                            setNewUserName('');
                            props.setUserName(newUserName);
                        }
                        else {
                            alert("Internal error occured");
                        }
                    }
                    else {
                        window.location = "/";
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            setError(isValidUserName[1]);
        }
    }

    const changeHeaderTheme = async (theme) => {
        if(theme != props.themeStyle){
            let data = new FormData();
            data.append("newTheme", theme);
            await axios({
                method: "post",
                url: "/app/change/headerTheme",
                data: data,
                headers: {
                    'X-CSRFTOKEN': Cookies.get('csrftoken'),
                }
            })
            .then((response) => {
                const response_data = response.data;
                if(response_data.authenticated){
                    if(response_data.content.changed){
                        props.setThemeStyle(theme);
                    }
                    else{
                        alert("Internall error occured");
                    }
                }
                else{
                    window.location = "/";
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <>
            <div class="d-flex justify-content-center">
                <div class="bg-light p-2 mt-5 m-2 border" style={{
                    width: "450px",
                    borderRadius: "10px"
                }}>
                    <div className="d-flex align-items-center border-bottom border-dark pb-1">
                        <div className="mr-2 ml-1 p-1" style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
                            <i class="fas fa-arrow-left"></i>
                        </div>
                        <div style={{ fontSize: "20px", fontWeight: "800" }}>
                            Account
                        </div>
                    </div>
                    <div class="">
                        <div class="p-2">
                            <div class="ml-1 mb-1" style={{ fontWeight: "700" }}>
                                Email address
                            </div>
                            <div class="p-1 shadow border" style={{ borderRadius: "5px" }}>
                                {userData.email_address}
                            </div>
                        </div>
                        <div class="p-2">
                            <div class="ml-1 mb-1" style={{ fontWeight: "700" }}>
                                User name
                            </div>

                            {userNameChangeMode ?
                                <>
                                    <input class="p-1 shadow border w-100" style={{ borderRadius: "5px", outline: "none" }}
                                        value={newUserName} placeholder="Enter username here"
                                        onChange={(event) => setNewUserName(event.target.value)} />
                                </> :
                                <>
                                    <div class="p-1 shadow border" style={{ borderRadius: "5px" }}>
                                        {userData.user_name}
                                    </div>
                                </>
                            }

                            <div className="d-flex align-items-center mt-2">
                                {userNameChangeMode ?
                                    <>
                                        <button className="btn btn-primary btn-sm mr-2" onClick={() => updateUsernameFunc(newUserName)}>
                                            Change
                                        </button>
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={() => {
                                                setNewUserName('');
                                                setUserNameChangeMode(false);
                                                setError('');
                                            }}>
                                            Cancel
                                        </button>
                                    </> :
                                    <>
                                        <button className="btn btn-secondary btn-sm"
                                            onClick={() => {
                                                setNewUserName('');
                                                setUserNameChangeMode(true);
                                            }}>Edit</button>
                                    </>
                                }
                                <div className="text-danger ml-2">{error}</div>
                            </div>
                        </div>
                        <div class="p-2">
                            <div class="ml-1 mb-1" style={{fontWeight: "700"}}>
                                <>
                                {props.themeStyle == "dark" ?
                                    <>Header background color (Dark)</> : 
                                    <>Header background color (Light)</>
                                }
                                </>
                            </div>
                            <div class="d-flex">
                                <button class="btn-block btn-light btn border mr-1 btn-sm" onClick={() => changeHeaderTheme("light")}>Light</button>
                                <button class="btn-block mt-0 btn-dark border btn ml-1 btn-sm" onClick={() => changeHeaderTheme("dark")}>Dark</button>
                            </div>
                        </div>
                        <ChangePasswordComponent />
                        <div class="p-2">
                            <div class="ml-1 mb-1" style={{ fontWeight: "700" }}>
                                Delete account
                            </div>
                            <button className="btn btn-danger btn-sm mt-1">Delete account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const ChangePasswordComponent = (props) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [isAllowed, setIsAllowed] = useState(false);
    const [error, setError] = useState('');

    const handleOnButtonClick = () => {

        if (isAllowed) {
            const isValidPassword = validatePassword(newPassword);
            if (isValidPassword[0]) {
                if(newPassword === newPassword1){
                    updatePasswordFunc();
                }
                else{
                    setError("Password mismatched");
                }
            }
            else {
                setError(isValidPassword[1]);
            }
        }
        else {
            if (currentPassword == '') {
                setError("Please enter current password")
            }
            else {
                checkPasswordFunc();
            }
        }
    }

    const checkPasswordFunc = async () => {
        await checkPassword(currentPassword)
        .then((response) => {
            const response_data = response.data;
            if(response_data.authenticated){
                if(response_data.content.correctPassword){
                    setCurrentPassword('');
                    setIsAllowed(true);
                    setError('');
                }
                else{
                    setError("Incorrect password");
                }
            }
            else{
                window.location = "/";
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const updatePasswordFunc = async () => {
        await updatePassword(newPassword)
        .then((response) => {
            const response_data = response.data;
            if(response_data.authenticated){ 
                if(response_data.content.updated){
                    setNewPassword('');
                    setNewPassword1('');
                    setCurrentPassword('');
                    setError('');
                    setIsAllowed(false);
                }
                else{
                    setError("Internal error occured")
                }
            }
            else{
                window.location = "/";
            }
        })
    }

    return (
        <>
            <div class="p-2">
                <div class="ml-1 mb-1" style={{ fontWeight: "700" }}>
                    Change password
                </div>
                {isAllowed ?
                    <>
                        <input class="p-1 shadow border w-100" style={{ borderRadius: "5px", outline: "none" }}
                            value={newPassword} placeholder="Enter new password" type={"password"}
                            onChange={(event) => setNewPassword(event.target.value)} />
                        <input class="p-1 shadow border w-100 mt-1" style={{ borderRadius: "5px", outline: "none" }}
                            value={newPassword1} placeholder="Repeat new password" type={"password"}
                            onChange={(event) => setNewPassword1(event.target.value)} />
                    </> :
                    <>
                        <input class="p-1 shadow border w-100" style={{ borderRadius: "5px", outline: "none" }}
                            value={currentPassword} placeholder="Enter current password" type={"password"}
                            onChange={(event) => setCurrentPassword(event.target.value)} />
                    </>
                }
                <div className="d-flex align-items-center mt-2">
                    <button className="btn btn-primary btn-sm" onClick={() => handleOnButtonClick()}>
                        {isAllowed ?
                            <>Change</> :
                            <>Proceed</>
                        }
                    </button>
                    <div className="ml-3 text-danger">
                        {error}
                    </div>
                </div>
            </div>
        </>
    )
}