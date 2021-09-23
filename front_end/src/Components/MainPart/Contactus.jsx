import React from 'react';
import logo from '../../logo.png'

export const Contactus = () => {
    return (
        <div class="d-flex justify-content-center m-3">
            <div class="border col-lg-6">
                <header class=" d-flex justify-content-start mt-3">
                    <div>
                        <img src={{logo}} class="rounded d-block" width="70" height="70" alt="Not found" class="img-thumbnail" />
                    </div>
                    <div class="login-app-name-block ml-3">
                        Wilstodo
                    </div>
                </header>
                <hr />
                <div>
                    <h1 className="text-center">Contact us</h1>
                </div>

                <main>
                    <form method="post">
                        <div class="mt-4">
                            <div style={{fontSize: "20px", fontWeight: "600"}}>
                                Enter your email-id
                            </div>
                            <div class="mt-1">
                                <input type="email" name="email" autocomplete="off" class="form-control" placeholder="Email address" aria-label="email" aria-describedby="basic-addon1" required />
                            </div>
                            <div class="mt-4" style={{fontSize: "20px", fontWeight: "600"}}>
                                Enter what you want to tell us
                            </div>
                            <div class="mt-1">
                                <textarea style={{resize: "100px"}} name="content" placeholder="Write text here" class="form-control" aria-label="With textarea" rows="8" required></textarea>
                            </div>
                            <div class="mt-4 mb-3">
                                <button class="btn btn-primary btn-sm btn-block">
                                    <div>Submit</div>
                                </button>
                            </div>
                            <div class="mb-3" style={{textAlign: "center", fontSize: "20px", color: "green"}}>
                                
                            </div>
                        </div>
                    </form>
                </main>

            </div>
        </div>
    )
}
