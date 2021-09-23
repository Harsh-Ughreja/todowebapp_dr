import React, { useEffect } from 'react'

export const AppMain = () => {

    useEffect(() => {
        document.title = "App | Wilstodo";
    }, []);

    return (
        <div class="d-flex justify-content-center align-items-center w-100 h-100 position-fixed" style={{ top: "0", backgroundColor: "aliceblue" }}>
            <div style={{maxWidth: "350px"}}>
                <div class="d-flex justify-content-center align-items-center p-4 shadow-lg border bg-light" style={{ borderRadius: "10px" }}>
                    <img src="/static/media/logo.1f6dc84f.png" alt="" width="70" height="70" class="d-inline-block align-text-top" />
                    <span class="d-flex flex-column">
                        <div class="ml-2 d-flex align-items-end">
                            <div style={{ fontSize: "38px", fontWeight: "800", lineHeight: "35px" }}>
                                Wilstodo
                            </div>
                            <div style={{ fontSize: "24px", lineHeight: "1" }}>
                                .com
                            </div>
                        </div>
                        <div class="text-end" style={{fontSize: "15px"}}>
                            Manage your tasks efficiently
                        </div>
                    </span>
                </div>
                <div class="p-3 border mt-5 shadow-lg bg-light" style={{ borderRadius: "10px" }}>
                    <div class="border-bottom pb-2 mb-2">
                        <b>My lists : </b>
                        In this tab your all task list(group of task) is showing. You can view, edit, delete it also.    </div>
                    <div class="border-bottom pb-2 mb-2">
                        <b>Scheduled : </b>
                        In this tab your all scheduled task sort as per month of due date.

                    </div>
                    <div>
                        <b>Today : </b>
                        In this tab you can see all your today's tasks.
                    </div>
                </div>
            </div>
        </div>
    )
}
