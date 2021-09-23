import React, { useState, useEffect, createRef } from 'react'
import {
    useParams,
    Link
} from 'react-router-dom';
import $ from 'jquery';
import { createNewTask, deleteTask, getListTasks, getScheduledTasks, getTodayTasks, updateTaskDetails, updateTaskTitle } from '../ApiCall/appApi';
import empty from '../../empty-icon.jpg'

const priorityColor = {
    0: "#e8e8e8",
    1: "#2083d2",
    2: "#d29d20",
    3: "rgb(191 10 10)",
}

export const ScheduledMain = (props) => {

    const { pk_list } = useParams();

    const [scheduledTasks, setScheduledTasks] = useState([]);
    const [hasTasks, setHasTaks] = useState(true);
    const [opened, setOpened] = useState(0);

    useEffect(() => {
        fetchScheduledTasks();
        document.title = "Scheduled | Wilstodo";
    }, []);

    const fetchScheduledTasks = async () => {
        await getScheduledTasks()
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    setScheduledTasks(response_data.content.scheduled_tasks);
                    setHasTaks(false);
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
        let result = [];

        for (let i = 0; i < scheduledTasks.length; i++) {
            const one_block = {};
            for (const [key, value] of Object.entries(scheduledTasks[i])) {
                for (let j = 0; j < value.length; j++) {
                    if (value[j].pk_task == pk_task) {
                        value[j].note = note;
                        value[j].due_date = due_date;
                        value[j].priority = priority;
                    }
                }
                one_block[key] = value;
            }
            result.push(one_block);
        }

        setScheduledTasks(result);
    }

    const deleteTaskFunc = async (pk_task) => {
        await deleteTask(pk_task)
            .then((response) => {
                const response_data = response.data;
                if (response_data.authenticated) {
                    if (response_data.content.deleted) {
                        let result = [];
                        for(let i=0;i<scheduledTasks.length;i++){
                            let one_block = {};
                            one_block["title"] = scheduledTasks[i].title;
                            one_block["tasks"] = scheduledTasks[i].tasks.filter((task) => {
                                return task.pk_task != pk_task;
                            })
                            if(one_block.tasks.length > 0){
                                result.push(one_block);
                            }
                        }
                        setScheduledTasks(result);
                    }
                    else {
                        alert("Internal error occured");
                    }
                }
                else {
                    window.location = "/";
                }
            })
    }


    return (
        <div>
            {'x' == '' ? '' :
                <>
                    <div className="d-flex justify-content-center">
                        {scheduledTasks.length == 0 && hasTasks == false ?
                            <>
                                <img src={empty} width="250" height="250" alt=""
                                    style={{ borderRadius: "10px" }} class="border shadow-lg mt-5" />
                            </> :
                            <>
                                <div className="mt-2" style={{ width: "600px" }}>
                                    <div className="m-2">
                                        <div>
                                            {scheduledTasks.map((block) => {
                                                return (
                                                    <>
                                                        <div className=" ml-3 mt-4 mb-2 mr-2" style={{ fontSize: "20px", fontWeight: "700" }}>
                                                            {block.title}
                                                        </div>
                                                        {block.tasks.map((task) => {
                                                            return (
                                                                <>
                                                                    <TaskComponent
                                                                        task={task}
                                                                        changeTaskDetail={changeTaskDetail}
                                                                        opened={opened}
                                                                        setOpened={setOpened}
                                                                        deleteTaskFunc={deleteTaskFunc}
                                                                    />
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <div class="position-fixed w-100 h-100" style={{ zIndex: "-1", top: "0px", backgroundColor: 'rgb(0 148 212 / 13%)' }}></div>
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
                    list_name={props.task.list.list_name}
                    list_id={props.task.list.list_id}
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
                            style={{ width: "60px", fontSize: "20px" }}>
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

                <div class="col-4 col-xl-3 col-md-3 col-sm-3 text-center text-truncate"
                    style={{
                        fontSize: "16px",
                        padding: "0px"
                    }}>

                    <Link className={"list-name-text-decoration text-dark"} to={`/myLists/${props.list_id}/`}>{props.list_name}</Link>

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
                            <i class="fas fa-chevron-up text-light bg-dark shadow" style={{ padding: "2px 3px 2px", borderRadius: "2px" }}></i>
                        </> :
                        <>
                            <i class="fas fa-chevron-down text-light bg-dark shadow" style={{ padding: "2px 3px 2px", borderRadius: "2px" }}></i>
                        </>
                    }
                </div>
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