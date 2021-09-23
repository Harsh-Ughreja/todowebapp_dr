import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../ApiCall/authApi';

export const LoginPart = (props) => {

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        document.title = "Login | Wilstodo";
    }, []);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        await loginUser(emailAddress, password)
            .then((response) => {
                const response_data = response.data;
                if (response_data.content.authenticated) {
                    window.location = "/";
                }
                else {
                    setError(response_data.content.error);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        setLoading(false);
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <form className="form-signin" onSubmit={(event) => handleOnSubmit(event)} >
                <div className="form-label-group" style={{ marginBottom: "20px" }}>
                    <input type="email" value={emailAddress} className="form-control"
                        placeholder="Email address" required onChange={(event) => setEmailAddress(event.target.value)} />
                </div>
                <div className="form-label-group">
                    <input type="password" value={password} className="form-control"
                        placeholder="Password" required onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="login-forgot-password-link-container">
                    <Link to="/forgotPassword/"
                        className="login-forgot-password-link">Forgot password?</Link>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary btn-sm w-100">
                        {loading ?
                            <>
                                <div className="spinner-border spinner-border-sm" style={{ marginTop: "2px" }}></div>
                            </> :
                            <>
                                Login
                            </>
                        }
                    </button>
                </div>
                <div className="loing-signup-link-container">
                    Don't have an account? <Link to="/signup/" className="text-primary">Sign up</Link>
                </div>
                {error == '' ? '' :
                    <>
                        <div class="text-danger text-center mt-1">
                            <p>{error}</p>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}


