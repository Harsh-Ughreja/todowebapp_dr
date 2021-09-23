import React, { useState, useEffect, createRef } from 'react'
import {
    useParams
} from 'react-router-dom';
import $ from 'jquery';
import { completeTask, createNewTask, deleteTask, getListTasks, updateTaskDetails, updateTaskTitle } from '../ApiCall/appApi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getInDateFormat } from '../JS';


const priorityColor = {
    0: "#e8e8e8",
    1: "#2083d2",
    2: "#d29d20",
    3: "rgb(191 10 10)",
}

export const ViewList = (props) => {

    const { pk_list } = useParams();

    const [viewedList, setViewedList] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedNumber, setCompletedNumber] = useState(0);
    const [opened, setOpened] = useState(0);

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

    useEffect(() => {
        fetchListTasks();
    }, []);

    const fetchListTasks = async () => {
        await getListTasks(pk_list)
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    setViewedList(response_data.content.viewedList);
                    document.title = response_data.content.viewedList.list_name + " | Wilstodo";
                    setTasks(response_data.content.tasks.notes);
                    setCompletedNumber(response_data.content.tasks.completed);
                }
                else {
                    window.location = '/';
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const createNewTaskFunc = async (title) => {
        await createNewTask(viewedList.pk_list, title)
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    if (response_data.content.created) {
                        setTasks([...tasks, response_data.content.newTask]);
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

    const changeTaskDetail = (pk_task, note, due_date, priority) => {
        setTasks(tasks.map((task) => {
            if (task.pk_task == pk_task) {
                task.note = note;
                task.due_date = due_date;
                task.priority = priority;
            }
            return task;
        }))
    }

    const deleteTaskFunc = async (pk_task) => {
        await deleteTask(pk_task)
        .then((response) => {
            const response_data = response.data;
            if(response_data.authenticated){
                if(response_data.content.deleted){
                    setTasks(tasks.filter((task) => {
                        return task.pk_task != pk_task;
                    }))
                }
                else{
                    alert("Internal error occured");
                }
            }
            else{
                window.location = "/";
            }
        })
    }

    const completeTaskFunc = async (pk_task) => {
        await completeTask(pk_task)
        .then((response) => {
            const response_data = response.data;
            if(response_data.authenticated){
                if(response_data.content.updated){
                    setTasks(tasks.filter((task) => {
                        return task.pk_task != pk_task;
                    }))
                }
                else{
                    alert("Internal error occured");
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


    return (
        <div>
            {viewedList == '' ? '' :
                <>
                    <div className="d-flex justify-content-center mt-4">
                        <div className="m-2" style={{ width: "600px" }}>
                            <div class="p-2 d-flex justify-content-between mb-3 shadow bg-light align-items-center"
                                style={{
                                    borderRadius: "4px",
                                    backgroundColor: "white",
                                    borderLeftStyle: "solid",
                                    borderWidth: "5px",
                                    borderColor: "black"
                                }}>
                                <div className="ml-2" style={{
                                    fontSize: "20px",
                                    fontWeight: "800"
                                }}>
                                    {viewedList.list_name}
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                    <b>{completedNumber}</b>&nbsp;
                                    <i class="fas fa-check-circle text-success" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div>
                                {tasks.map((task) => {
                                    return (
                                        <>
                                            <TaskComponent
                                                task={task}
                                                changeTaskDetail={changeTaskDetail}
                                                opened={opened}
                                                setOpened={setOpened}
                                                deleteTaskFunc={deleteTaskFunc}
                                                completeTaskFunc={completeTaskFunc}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                            <NewTaskComponent
                                createNewTaskFunc={createNewTaskFunc}
                            />
                        </div>
                    </div>
                    <div class="position-fixed w-100 h-100"
                        style={{
                            zIndex: -1,
                            top: 0,
                            backgroundColor: backgroundColorOptions[viewedList.list_background]
                        }}>
                    </div>
                </>
            }
        </div>
    )
}

export const TaskComponent = (props) => {

    const [showDetails, setShowDetails] = useState(false);
    const [open, setOpen] = useState(0);

    return (
        <>
            <div className="mb-3 shadow"
                style={{
                    borderRadius: "4px",
                    backgroundColor: "white",
                    borderLeftStyle: "solid",
                    borderWidth: "5px",
                    borderColor: priorityColor[props.task.priority]
                }}>
                <TaskHeader
                    setShowDetails={setShowDetails}
                    showDetails={showDetails}
                    task_title={props.task.task_title}
                    due_date={props.task.due_date}
                    pk_task={props.task.pk_task}
                    setOpen={setOpen}
                    open={open}
                    opened={props.opened}
                    setOpened={props.setOpened}
                />
                {showDetails ?
                    <>
                        <TaskDetails
                            pk_task={props.task.pk_task}
                            note={props.task.note}
                            priority={props.task.priority}
                            changeTaskDetail={props.changeTaskDetail}
                            open={open}
                            setShowDetails={setShowDetails}
                            opened={props.opened}
                            setOpened={props.setOpened}
                            deleteTaskFunc={props.deleteTaskFunc}
                            completeTaskFunc={props.completeTaskFunc}
                        />
                    </> :
                    <>

                    </>
                }
            </div>
        </>
    )
}

export const TaskDetails = (props) => {

    const [note, setNote] = useState(props.note);
    const [dueDate, setDueDate] = useState(props.dueDate);
    const [priority, setPriority] = useState(props.priority);

    const wrapperRef = createRef();

    useEffect(() => {
        if (props.opened == props.pk_task) {
            $(`.task-details-${props.pk_task}`).slideDown(450)
        }
        else {
            $(`.task-details-${props.pk_task}`).slideUp(450);
        }
    }, [props.opened]);

    // useEffect(() => {
    //     if(props.open != 0){
    //         // if(props.open % 2 == 1){
    //         //     $('.task-details').slideUp(450);
    //         //     $(`.task-details-${props.pk_task}`).slideDown(450);
    //         // }
    //         // else{
    //         //     $(`.task-details-${props.pk_task}`).slideUp(450, function() {
    //         //         props.setShowDetails(false);
    //         //     });
    //         // }

    //         // $('.task-details').slideUp(450);
    //         // $(`.task-details-${props.pk_task}`).slideDown(450);
    //     }
    // }, [props.open]);

    const handleOnSaveEvent = async () => {
        const noteContent = document.getElementById(`note-${props.pk_task}`).innerHTML;
        await updateTaskDetails(props.pk_task, noteContent, dueDate, priority)
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    if (response_data.content.updated) {
                        props.changeTaskDetail(props.pk_task, noteContent, dueDate, priority);
                    }
                    else {
                        alert("Some internal error occured");
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
        <>
            <div class={`task-details-${props.pk_task} task-details`} style={{ padding: "6px 10px 12px 13px", display: "none" }}>
                <div class="d-flex flex-column">
                    <div style={{ fontSize: "18px", paddingBottom: "4px" }}>
                        Notes
                    </div>
                    <div contenteditable="true" className="w-100 border" id={`note-${props.pk_task}`}
                        style={{
                            height: "130px",
                            outline: "none",
                            padding: "10px",
                            overflowY: "scroll",
                            borderRadius: "3px",
                        }} dangerouslySetInnerHTML={{ __html: note }}>


                    </div>
                    <div class="mt-3 d-flex justify-content-between">
                        <div>
                            <div style={{ fontSize: "18px", paddingBottom: "4px" }}>
                                Due date <span><button class="btn btn-sm">Clear</button></span>
                            </div>
                            <div>
                                <input type="date" name="noteDueDate" class="border" value=" 2021-04-25"
                                    style={{
                                        outline: "none",
                                        padding: "7px",
                                        borderRadius: "4px"
                                    }} onChange={(event) => setDueDate(event.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: "18px", paddingBottom: "4px" }}>  
                                Priority
                            </div>
                            <div class="input-group mb-3">
                                <select class="custom-select" name="notePriority" onChange={(event) => setPriority(event.target.value)}>
                                    <option value="0" selected={props.priority == 0} >None</option>
                                    <option value="1" selected={props.priority == 1}>Low</option>
                                    <option value="2" selected={props.priority == 2}>Medium</option>
                                    <option value="3" selected={props.priority == 3}>High</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end" style={{}}>
                        <button class="btn btn-success btn-sm ml-1 d-flex justify-content-center align-items-center"
                            style={{ width: "60px", fontSize: "20px" }}
                            onClick={() => props.completeTaskFunc(props.pk_task)}>
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-primary btn-sm ml-1 d-flex justify-content-center align-items-center"
                            style={{ width: "60px", fontSize: "20px" }}
                            onClick={() => handleOnSaveEvent()}>
                            <i class="far fa-save"></i>
                        </button>
                        <TaskDeleteButton
                            pk_task={props.pk_task}
                            deleteTaskFunc={props.deleteTaskFunc}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export const TaskHeader = (props) => {

    const [taskTitle, setTaskTitle] = useState(props.task_title);

    const handleOnChange = (taskTitle) => {
        updateTaskTitle(props.pk_task, taskTitle)
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    setTaskTitle(taskTitle);
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
        <>
            <div class="p-2 d-flex justify-content-around align-items-center">

                <form class="col-7 col-xl-8 col-md-8 col-sm-8" style={{ padding: "0px" }}>
                    <input type="text" value={taskTitle} name="headingName" class="col-12 border pl-2"
                        style={{ outline: "none", zIndex: "0", borderRadius: "5px" }} spellcheck="false"
                        autoComplete={"off"} onChange={(event) => handleOnChange(event.target.value)} />
                </form>

                <div class="col-4 col-xl-3 col-md-3 col-sm-3 text-center"
                    style={{
                        fontSize: "16px",
                        padding: "0px"
                    }}>

                    {props.due_date == '' || props.due_date == undefined ?
                        <>
                            -
                        </> :
                        <>
                            {props.due_date}
                        </>
                    }

                </div>

                {/* <div style={{ cursor: "pointer" }} onClick={() => props.setShowDetails(!props.showDetails)}> */}
                <div style={{ cursor: "pointer" }}
                    onClick={() => {
                        if (props.opened == props.pk_task) {
                            props.setOpened(0);
                        }
                        else {
                            props.setOpened(props.pk_task);
                        }
                        props.setShowDetails(true);
                    }}>
                    {props.opened == props.pk_task ?
                        <>
                            <i class="fas fa-chevron-up text-light bg-dark shadow" style={{padding: "2px 3px 2px", borderRadius: "2px"}}></i>
                        </> :
                        <>
                            <i class="fas fa-chevron-down text-light bg-dark shadow" style={{padding: "2px 3px 2px", borderRadius: "2px"}}></i>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export const NewTaskComponent = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');


    return (
        <>
            <div class="d-flex align-items-center bg-light shadow mb-5" style={{
                // boxShadow: "-2px 5px 22px 2px #dadada", 
                borderRadius: "4px"
            }}>
                <div class="ml-3 mr-2">
                    <i class="fas fa-plus" aria-hidden="true"></i>
                </div>
                <form className="w-100" onSubmit={(event) => {
                    event.preventDefault();
                    if (newTaskTitle != '') {
                        props.createNewTaskFunc(newTaskTitle);
                    }
                    newTaskTitle('');
                }}>
                    <input type="text" class="p-2 new-task-input-width bg-light" value={newTaskTitle}
                        style={{
                            borderStyle: "none",
                            outline: "none"
                        }} placeholder="New task..." onChange={(event) => setNewTaskTitle(event.target.value)} />
                </form>

            </div>
        </>
    )
}


const TaskDeleteButton = (props) => {

    const [showPopup, setShowPopup] = useState(false);

    const hidePopup = () => {
        setShowPopup(false);
    }

    return (
        <>
            <button class="btn btn-danger btn-sm ml-1 d-flex justify-content-center align-items-center position-relative"
                style={{ width: "60px", fontSize: "20px" }} onClick={() => setShowPopup(true)}>
                <i className="fas fa-trash-alt"></i>
                {showPopup ?
                    <>
                        <div style={{
                            width: "200px",
                            bottom: "35px",
                            right: "-5px",
                            borderRadius: "6px",
                            zIndex: 2,
                        }} className="bg-light position-absolute shadow-lg text-dark">
                            <div className="p-2 d-flex flex-column">
                                <div className="d-flex justify-content-between align-tems-center border-bottom mb-2">
                                    <div style={{ fontWeight: "700" }}>
                                        Are you sure?
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <button class="btn-block btn btn-sm btn-danger mr-1"
                                        onMouseUp={() => {
                                            props.deleteTaskFunc(props.pk_task)
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