import React, {useState, useEffect} from 'react';
import { signupUser } from '../ApiCall/authApi';
import { validateEmailAddress, validatePassword, validateUserName } from '../JS/valiator';

export const SignupPart = (props) => {

    const [userName, setUserName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        document.title = "Signup | Wilstodo";
    }, []);

    const handleOnSubmit = async (event) => {
        
        event.preventDefault();
        if(!loading){
            setError('');
            
            const isValidUseName = validateUserName(userName);

            if(isValidUseName[0]){
                const isValidEmailAddress = validateEmailAddress(emailAddress);

                if(isValidEmailAddress[0]){
                    const isValidPassword = validatePassword(password);

                    if(isValidPassword[0]){ 
                        setLoading(true);
                        await signupUser(userName, emailAddress, password)
                        .then((response) => {
                            const response_data = response.data;
                            if(response_data.content.created){
                                window.location = "/";
                            }
                            else{
                                setError(response_data.content.error);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        setLoading(false);
                    }
                    else{
                        setError(isValidPassword[1]);
                    }
                }
                else{
                    setError(isValidEmailAddress[1]);
                }
            }
            else{
                setError(isValidUseName[1]);
            }
        }
    }

    return (
        <div style={{marginTop: "20px"}} >
            <form class="form-signin" onSubmit={(event) => handleOnSubmit(event)}>
                <div class="form-label-group" style={{marginBottom: "20px"}}>
                    <input type="text" value={userName} class="form-control"
                        placeholder="User name" required onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div class="form-label-group" style={{marginBottom: "20px"}}>
                    <input type="email" value={emailAddress} class="form-control"
                        placeholder="Email address" required onChange={(event) => setEmailAddress(event.target.value)} />
                </div>
                <div class="form-label-group" style={{marginBottom: "20px"}}>
                    <input type="password" value={password} class="form-control"
                        placeholder="Set password" required onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div>
                    <button type="submit" class="btn btn-primary btn-sm w-100">
                        {loading ? 
                            <>
                                <div className="spinner-border spinner-border-sm" style={{marginTop: "2px"}}></div>   
                            </> : 
                            <>
                                Sign up
                            </>
                        }
                    </button>
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
