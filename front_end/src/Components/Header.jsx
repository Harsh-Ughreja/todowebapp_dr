import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../logo.png';
import { createNewList } from './ApiCall/appApi';
import { logOutUser } from './ApiCall/authApi';
import $ from 'jquery';

export const Header = (props) => {

    const [windowSize, setWindowSize] = useState("big");
    const history = useHistory();

    useEffect(() => {
        window.onresize = handleonResize;
        handleonResize();
    }, []);

    const handleonResize = () => {
        if (window.innerWidth <= 600) {
            setWindowSize("small")
        }
        else {
            setWindowSize("big");
        }
    }

    const getClass = (isSelected, themeStyle) => {
        if(themeStyle == "dark"){
            if(isSelected){
                return "text-dark bg-light";
            }
            else{
                return "text-dark bg-light";
            }
        }
        else{
            if(isSelected){
                return "text-dark bg-light";
            }
            else{
                return "text-light bg-primary";
            }
        }
    }

    return (
        <>
            {/* {windowSize == "small"? 
                <>
                    Small header
                </>: 
                <>
                    <LargeHeader {...props} />
                </>
            } */}

            <div className={"position-sticky"} style={{ top: "0px", zIndex: "1" }}>
                <nav className={`navbar ${props.themeStyle == 'dark' ? 'navbar-dark bg-dark border-light' : 'navbar-light bg-light border-dark'}  border-bottom shadow`}>
                    <div className="container-fluid p-0">
                        <Link className="navbar-brand d-flex justify-content-center" to="/">
                            <img src={logo} alt="" width="30" height="30" className="d-inline-block align-text-top" />
                            <span class="d-flex flex-column">
                                <div class="ml-2 d-flex align-items-center">
                                    <div style={{fontSize: "22px", fontWeight: "700", lineHeight: "30px"}}>
                                        Wilstodo
                                    </div>
                                    <div style={{fontSize: "15px"}} class="d-flex align-items-end h-100">
                                        .com
                                    </div>
                                </div>
                            </span>
                        </Link>
                        {windowSize == "big" ?
                            <>
                                <div>
                                    <ul className="nav nav-pills" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <Link to={"/myLists/"} className={`nav-link ${props.activeTab == "myLists" ? "active" : ''}`}  >
                                                My lists
                                                {/* <span class="badge bg-light text-dark">4</span> */}
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to={"/scheduled/"} className={`nav-link ${props.activeTab == "scheduled" ? "active" : ''}`}>
                                                Scheduled
                                                {/* <span class="badge bg-light text-dark">4</span> */}
                                            </Link>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <Link to={"/today/"} className={`nav-link ${props.activeTab == "today" ? "active" : ''}`}>
                                                Today
                                                {/* <span class="badge bg-light text-dark">4</span> */}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </> : ''
                        }

                        <div className={"d-flex justify-content-end"} style={{ width: windowSize == "big" ? "164px" : "unset" }}>
                            <div className="mr-3">
                                {/* <button className={"btn btn-light btn-sm"}>
                                    <i className="fas fa-plus"></i>
                                </button> */}
                                <NewListComponent
                                    themeStyle={props.themeStyle}
                                />
                            </div>
                            <div className="btn-group">
                                <button type="button" className={`btn btn-${props.themeStyle == "dark" ? 'light' : 'dark'} dropdown-toggle btn-sm`} data-bs-toggle="dropdown">
                                    <i className="fas fa-cog"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <div class="pt-2 pl-3 pr-3 pb-2" style={{ maxWidth: "200px" }}>
                                            <div style={{ fontSize: "15px" }}>Hello</div>
                                            <div style={{ fontWeight: "700" }} className="text-truncate">{props.userName}</div>
                                            <div style={{ fontSize: "13px" }} className="text-truncate">{props.emailAddress}</div>
                                        </div>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to={"/account/"} className="dropdown-item" type="button">Account</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" type="button" onClick={async () => {
                                        await logOutUser()
                                            .then((response) => {
                                                const response_data = response.data;
                                                if (response_data.content.isLoggedOut) {
                                                    window.location = '/';
                                                }
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            })
                                    }}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {windowSize == "small" ?
                        <>
                            <div className="w-100">
                                <ul className="nav nav-pills d-flex justify-content-around" role="tablist">
                                    <li class={`nav-item d-flex justify-content-center align-items-center pl-1 pr-1 ${props.themeStyle == "dark" ? "text-light" : 'text-dark'}`} role="presentation"
                                        style={{ cursor: "pointer" }} onClick={() => history.goBack()} >
                                        <i class="fas fa-arrow-left" aria-hidden="true"></i>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to={"/myLists/"} className={`nav-link ${props.activeTab == "myLists" ? "active" : ''}`}  >
                                            My lists
                                            {/* <span class={`badge ml-1 ${getClass(props.activeTab == "myLists", props.themeStyle)}`}>4</span> */}
                                        </Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to={"/scheduled/"} className={`nav-link ${props.activeTab == "scheduled" ? "active" : ''}`}>
                                            Scheduled
                                            {/* <span class={`badge ml-1 ${getClass(props.activeTab == "myLists", props.themeStyle)}`}>4</span> */}
                                        </Link>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <Link to={"/today/"} className={`nav-link ${props.activeTab == "today" ? "active" : ''}`}>
                                            Today
                                            {/* <span class={`badge ml-1 ${getClass(props.activeTab == "myLists", props.themeStyle)}`}>4</span> */}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </> : ''
                    }
                </nav>
            </div>

        </>
    )


}


const NewListComponent = (props) => {

    const [isShowPopup, setIsShowPopup] = useState(false);

    return (
        <>
            <button type="button" className={`btn btn-${props.themeStyle == "dark" ? 'light' : 'dark'} btn-sm`} onClick={() => setIsShowPopup(true)}>
                <i className="fas fa-plus"></i>
            </button>

            {isShowPopup ?
                <>
                    <NewListPopup
                        setIsShowPopup={setIsShowPopup}
                    />
                </> : ''
            }

        </>
    )
}

const NewListPopup = (props) => {

    const [newListName, setNewListName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleOnCreate = async (event) => {
        event.preventDefault();
        if (newListName == '') {
            setError("List name can not be empty");
        }
        else {
            setLoading(true);
            await createNewList(newListName)
                .then((response) => {
                    const response_data = response.data;
                    if (response_data.authenticated) {
                        if (response_data.content.created) {
                            hideModal();
                            if(window.location.pathname == "/myLists/" || window.location.pathname == "/myLists"){
                                window.location.reload();
                            }
                        }
                        else {
                            setError(response_data.content.error);
                        }
                    }
                    else {
                        window.location = '/';
                    }
                })
            setLoading(false);
        }
    }

    useEffect(() => {
        $(".modal").fadeIn(100);
    }, []);

    const hideModal = () => {
        $(".modal").fadeOut(100, function () {
            props.setIsShowPopup(false);
        })
    }

    return (
        <>
            <div className="modal" style={{ display: "none", backgroundColor: "#1010107d" }}>
                <div className="modal-dialog  modal-dialog-centered">
                    <form onSubmit={(event) => handleOnCreate(event)} className={"w-100"}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New list</h5>
                                <button type="button" className="btn-close" onClick={() => hideModal()}></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group flex-nowrap">
                                    <input value={newListName} onChange={(event) => setNewListName(event.target.value)} type="text" className="form-control" placeholder="New list name" aria-label="Username" aria-describedby="addon-wrapping" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="d-flex justify-content-between w-100 align-items-center">
                                    <div className="text-danger">
                                        {error}
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-secondary" onClick={() => hideModal()}>Cancel</button>
                                        <button type="submit" className="btn btn-primary ml-2" style={{ width: "75px" }}>
                                            {loading ?
                                                <>
                                                    <div className="spinner-border spinner-border-sm"></div>
                                                </> :
                                                <>
                                                    Create
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}