import React, { useEffect, useState } from 'react'
import { deleteList, getMyLists, updateMyList } from '../ApiCall/appApi';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import empty from '../../empty-icon.jpg';

export const ListsMain = (props) => {

    const [myLists, setMyLists] = useState([]);
    const [hasLists, setHasLists] = useState(true);

    useEffect(() => {
        document.title = "My lists | Wilstodo";
        fetchMyLists();
    }, []);

    const fetchMyLists = async () => {
        await getMyLists()
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    setMyLists(response_data.content.myLists);
                    setHasLists(false);
                }
                else {
                    window.location = '/';
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const changeListProperty = (pk_list, newName, backgroundColor) => {
        setMyLists(myLists.map((list) => {
            if (list.pk_list == pk_list) {
                list.list_name = newName;
                list.list_background = backgroundColor;
            }
            return list;
        }))
    }

    const deleteListFunc = async (pk_list) => {
        await deleteList(pk_list)
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    if (response_data.content.deleted) {
                        setMyLists(myLists.filter((list) => {
                            return list.pk_list != pk_list
                        }))
                    }
                    else {
                        alert("Internal error occured");
                    }
                }
                else {
                    window.location = '/';
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>

            <div className="d-flex justify-content-center">
                {myLists.length == 0 && hasLists == false ?
                    <>
                        <img src={empty} width="250" height="250" alt="" 
                            style={{borderRadius: "10px"}} class="border shadow-lg mt-5" />
                    </> :
                    <>
                        <div className="d-flex flex-wrap list-container-width">
                            {myLists.map((list) => {
                                return (
                                    <>
                                        <ListComponent
                                            listData={list}
                                            changeListProperty={changeListProperty}
                                            deleteListFunc={deleteListFunc}
                                        />
                                    </>
                                ) 
                            })}   
                        </div>
                    </>
                }
            </div>
            <div class="w-100 h-100 position-fixed"
                style={{
                    top: "0px",
                    backgroundColor: "aliceblue",
                    zIndex: "-1"
                }}></div>
        </div>
    )
}


export const ListComponent = (props) => {

    const [showEditPopup, setShowEditPopup] = useState(false);

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
        11: "rgb(226 77 149)",
    }

    return (
        <>
            <div className="m-3 bg-light"
                style={{
                    width: "270px",
                    boxShadow: "-2px 7px 25px 3px lightgrey",
                    borderRadius: "10px"
                }}>
                <div className="d-flex flex-column">
                    <div className="" style={{
                        height: "240px",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        backgroundColor: backgroundColorOptions[props.listData.list_background],
                        fontSize: "19px"
                    }}>
                        <div className={`p-3 pt-2 text-${(props.listData.list_background == 1 || props.listData.list_background == 5) ? 'dark' : "white"}`}>
                            {props.listData.recent_tasks.map((title) => {
                                return (
                                    <>
                                        <div className="text-truncate mt-2 mb-2">{title}</div>
                                    </>
                                )
                            })}
                        </div>

                    </div>
                    <div className="p-3">
                        <Link to={`/myLists/${props.listData.pk_list}/`} className={"text-dark list-name-text-decoration"}>
                            <div className="text-left mb-2 text-truncate"
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "700",
                                    cursor: "pointer"
                                }}>
                                {props.listData.list_name}
                            </div>
                        </Link>
                        <div className="d-flex justify-content-start">
                            <Link to={`/myLists/${props.listData.pk_list}/`}>
                                <button className="btn btn-primary btn-sm mr-2" style={{ width: "50px" }}>
                                    <i className="fas fa-envelope-open-text"></i>
                                </button>
                            </Link>
                            <button className="btn btn-success btn-sm mr-2" style={{ width: "50px" }}
                                onClick={() => setShowEditPopup(true)}>
                                <i className="far fa-edit"></i>
                            </button>
                            <DeleteButton
                                deleteListFunc={props.deleteListFunc}
                                pk_list={props.listData.pk_list}
                            />
                        </div>
                    </div>
                </div>
                {showEditPopup ?
                    <>
                        <ListEditPopup
                            setShowEditPopup={setShowEditPopup}
                            listData={props.listData}
                            changeListProperty={props.changeListProperty}
                        />
                    </> : ''}
            </div>
        </>
    )
}

export const ListEditPopup = (props) => {

    const [listName, setListName] = useState(props.listData.list_name);
    const [listBackground, setListBackground] = useState(props.listData.list_background);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const backgroundColorOptions = [
        { id: 1, color: "#efefef" },
        { id: 2, color: "cornflowerblue" },
        { id: 3, color: "#00bcd4" },
        { id: 4, color: "#4caf50" },
        { id: 5, color: "#ffeb3b" },
        { id: 6, color: "#2196f3" },
        { id: 7, color: "#9c27b0" },
        { id: 8, color: "#9e9e9e" },
        { id: 9, color: "#795548" },
        { id: 10, color: "#3f51b5" },
        { id: 11, color: "rgb(234 82 156)" },
    ]

    useEffect(() => {
        $(".modal").fadeIn(100);
    }, []);

    const hideModal = () => {
        $(".modal").fadeOut(100, function () {
            props.setShowEditPopup(false);
        })
    }

    const handleOnUpdate = async () => {
        if (listName == '') {
            setError("List name can not be empty");
        }
        else {
            setError('');
            setLoading(true);
            await updateMyList(props.listData.pk_list, listName, listBackground)
                .then((response) => {
                    const response_data = response.data;
                    if (response_data.authenticated) {
                        if (response_data.content.updated) {
                            props.changeListProperty(props.listData.pk_list, listName, listBackground);
                            hideModal();
                        }
                        else {
                            setError(response_data.content.error);
                        }
                    }
                    else {
                        window.location = "/";
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            setLoading(false);
        }
    }



    return (
        <>
            <div className="modal" style={{ display: "none", backgroundColor: "#1010107d" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit list</h5>
                            <button type="button" className="btn-close" onClick={() => hideModal()}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group flex-nowrap">
                                <input value={listName} onChange={(event) => setListName(event.target.value)} type="text" className="form-control" placeholder="New list name" aria-label="Username" aria-describedby="addon-wrapping" />
                            </div>
                        </div>
                        <div className="modal-body pt-0">
                            <div className="mb-2">Choose list background</div>
                            <div class="d-flex justify-content-between w-100 shadow" style={{ cursor: "pointer" }}>
                                {/* <div style={{
                                    "width": "10%",
                                    "borderRadius": "6px",
                                    "height": "38px", 
                                    "backgroundColor": "" }}>
                                </div> */}
                                {backgroundColorOptions.map((color) => {
                                    return (
                                        <>
                                            <div style={{
                                                "width": "10%",
                                                // "borderRadius": "3px",
                                                "height": "30px",
                                                "backgroundColor": color.color,
                                                "borderStyle": listBackground == color.id ? "solid" : "none",
                                            }} onClick={() => setListBackground(color.id)}>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            <div className="modal-footer pr-0 pb-0 pl-0">
                                <div className="d-flex justify-content-between w-100 align-items-center">
                                    <div className="text-danger">
                                        {error}
                                    </div>
                                    <button className="btn btn-primary" style={{ width: "75px" }} onClick={() => handleOnUpdate()}>
                                        {loading ?
                                            <>
                                                <div className="spinner-border spinner-border-sm"></div>
                                            </> :
                                            <>
                                                Update
                                            </>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const DeleteButton = (props) => {

    const [showPopup, setShowPopup] = useState(false);

    const hidePopup = () => {
        setShowPopup(false);
    }

    return (
        <>
            <button className="btn btn-danger btn-sm position-relative" style={{ width: "50px" }} onClick={() => setShowPopup(true)}>
                <i className="fas fa-trash-alt"></i>
                {showPopup ?
                    <>
                        <div style={{
                            width: "200px",
                            bottom: "35px",
                            right: "-80px",
                            borderRadius: "6px",
                            zIndex: 2,
                        }} className="bg-light position-absolute shadow-lg text-dark">
                            <div className="p-2 d-flex flex-column">
                                <div className="d-flex justify-content-between align-tems-center border-bottom mb-2">
                                    <div style={{ fontWeight: "700" }}>
                                        Are you sure?
                                    </div>
                                    {/* <div>
                                        <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                                    </div> */}
                                </div>
                                <div class="d-flex">
                                    <button class="btn-block btn btn-sm btn-danger mr-1"
                                        onMouseUp={() => {
                                            props.deleteListFunc(props.pk_list)
                                            setShowPopup(false);
                                        }}>Yes</button>
                                    <button class="btn-block btn btn-sm btn-success mt-0" onMouseUp={() => hidePopup()}>No</button>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            top: "0px",
                            left: "0px",
                            zIndex: 1,
                            backgroundColor: "rgba(16, 16, 16, 0.49)",
                        }} className="w-100 h-100 position-fixed">

                        </div>
                    </> : ''
                }
            </button>
        </>
    )
}