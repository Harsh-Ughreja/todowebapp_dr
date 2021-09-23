import React, { useEffect, useState } from 'react'
import { SendChangePasswordLink } from '../ApiCall/authApi';

export const ForgotPasswordPart = (props) => {

    const [emailAddress, setEmailAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        document.title = "Forgot password | Wilstodo.com";
    }, []);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        sendChangePasswordLinkFunc(emailAddress);
    }

    const sendChangePasswordLinkFunc = async (emailAddress) => {
        setLoading(true);
        setText('');
        await SendChangePasswordLink(emailAddress)
        .then((response) => {
            const response_data = response.data;
            if(response_data.authenticated){
                window.location = "/";
            }
            else{
                if(response_data.content.sent){
                    setText(response_data.content.text);
                    setIsSent(true);
                }
                else{
                    setText(response_data.content.error);
                    setIsSent(false);
                }
            }
        })
        .catch((error) => {
            console.log(error);
            setText("Internal error occured, Trye again.");
            setIsSent(false);
        })
        setLoading(false);
    }

    return (
        <div style={{marginTop: "20px"}}>
            <form class="form-signin" onSubmit={(event) => handleOnSubmit(event)} >
                <div class="form-label-group" style={{marginBottom: "20px"}}>
                    <input type="email" value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} class="form-control"
                        placeholder="Email address" required />
                </div>
                <div>
                    <button type="submit" class="btn btn-primary btn-sm btn-block">
                        {loading ?
                            <div className="spinner-border spinner-border-sm"></div> : 
                            <div>Send link</div>
                        }
                    </button>
                </div>
                <div>
                    {text == '' ? '' : 
                        <>
                            <div className={`text-center mt-2 ${isSent ? "text-success" : "text-danger"}`}>
                                {text}
                            </div>
                        </>
                    }
                </div>
            </form>
        </div>
    )
}
