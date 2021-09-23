import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../logo.png";
import { ForgotPasswordPart } from './ForgotPasswordPart';
import { LoginPart } from './LoginPart';
import { SignupPart } from './SignupPart';

export const AuthMain = (props) => {


    const authPart = () => {
        if (props.authActionType == "login") {
            return (
                <>
                    <LoginPart />
                </>
            )
        }
        else if (props.authActionType == "signup") {
            return (
                <>
                    <SignupPart />
                </>
            )
        }
        else if (props.authActionType == "forgotPassword") {
            return (
                <>
                    <ForgotPasswordPart />
                </>
            )
        }
    }

    return (
        <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center" 
            style={{
                top: "0",
                backgroundColor: "aliceblue",
            }}>
            <div className="login-container-width">
                <div className="d-flex justify-content-center flex-column p-3 border shadow-sm bg-light" style={{borderRadius: "10px"}}>
                    <AuthHeader />
                    {authPart()}
                    <AuthFooter />
                </div>
            </div>
        </div>
    )
}

export const AuthHeader = () => {

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-sm-12 col-10">
                    <div className={"d-flex justify-content-center"}>
                        <img src={logo} className="rounded mx-auto d-block" width="100" height="100"
                            alt="Not found" className="img-thumbnail" />
                    </div>
                    <div className="login-app-name-block">
                        Wilstodo
                    </div>
                </div>
            </div>
        </>
    )
}


export const AuthFooter = (props) => {

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                &#169; 2021 Wilstodo.com
            </div>

            {/* <div className="d-flex justify-content-center mt-1">
                <div className="d-flex">
                    <a className="login-forgot-password-link" href="/term-conditions" target="_black">Terms</a>
                    <p style={{ margin: "0px 5px 0px 5px", color: "#007bff" }} >&sdot;</p>
                    <a className="login-forgot-password-link" href="/privacypolicy" target="_black">Privacy policy</a>
                    <p style={{ margin: "0px 5px 0px 5px", color: "#007bff" }}>&sdot;</p>
                    <a className="login-forgot-password-link" href="/contactus" target="_black">Contact us</a>
                    <p style={{ margin: "0px 5px 0px 5px", color: "#007bff" }}>&sdot;</p>
                    <a className="login-forgot-password-link" href="/help" target="_black">Help</a>
                </div>
            </div> */}
            <div className="d-flex justify-content-center">
                <div>
                    <span>
                        <Link className="text-dark" to="/terms-conditions/" style={{textDecoration: "none"}} target="_black">
                            Terms
                        </Link>
                    </span>
                    <span> &sdot; </span>
                    <span>
                        <Link className="text-dark" to="/privacy-policy/" style={{textDecoration: "none"}} target="_black">
                            Privacy policy
                        </Link>
                    </span>
                    <span> &sdot; </span>
                    <span>
                        <Link className="text-dark" to="/contact-us/" style={{textDecoration: "none"}} target="_black">
                            Contact us
                        </Link>
                    </span>
                    <span> &sdot; </span>
                    <span>
                        <Link className="text-dark" to="/help/" style={{textDecoration: "none"}} target="_black">
                            Help
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}