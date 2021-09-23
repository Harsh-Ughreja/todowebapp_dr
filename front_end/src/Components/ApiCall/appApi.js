import axios from "axios";
import Cookies from "js-cookie";


export const createNewList = async (newListName) => {

    let data = new FormData();
    data.append("newListName", newListName);

    const response = await axios({
        method: "post",
        url: "/app/new/list",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        },
    })

    return response;
}

export const createNewTask = async (pk_list, newTaskTitle) => {

    let data = new FormData();
    data.append("pk_list", pk_list);
    data.append("newTaskTitle", newTaskTitle);

    const response = await axios({
        method: "post",
        url: "/app/new/task",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })

    return response;
}

export const getMyLists = async () => {
    const response = await axios({
        method: "get",
        url: "/app/get/myLists/",
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const getListTasks = async (pk_list) => {

    const response = await axios({
        method: "get",
        url: "/app/get/listTasks/",
        params: {
            pk_list: pk_list,
        },
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const getScheduledTasks = async () => {

    const response = await axios({
        method: "get",
        url: "/app/get/scheduled",
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const getTodayTasks = async () => {

    const response = await axios({
        method: "get",
        url: "/app/get/today",
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const updateMyList = async (pk_list, newName, background_color) => {

    let data = new FormData();
    data.append("pk_list", pk_list);
    data.append("newName", newName);
    data.append("backgroundColor", background_color);

    const response = await axios({
        method: "post",
        url: "/app/update/list",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const updateTaskTitle = async (pk_task, newTitle) => {

    let data = new FormData();
    data.append("pk_task", pk_task);
    data.append("newTitle", newTitle);

    const response = await axios({
        method: "post",
        url: "/app/update/task/taskTitle",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const updateTaskDetails = async (pk_task, note, due_date, priority) => {

    let data = new FormData();
    data.append("pk_task", pk_task);
    data.append("note", note);
    data.append("due_date", due_date);
    data.append("priority", priority);

    const response = await axios({
        method: "post",
        url: "/app/update/task/taskDetail",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
} 

export const completeTask = async (pk_task) => {

    let data = new FormData();
    data.append("pk_task", pk_task);

    const response = await axios({
        method: "post",
        url: "/app/update/task/complete",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })

    return response;
}

export const deleteList = async (pk_list) => {

    let data = new FormData();
    data.append("pk_list", pk_list);

    const response = await axios({
        method: "post",
        url: "/app/delete/list",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        },
    })
    return response;
}

export const deleteTask = async (pk_task) => {

    let data = new FormData();
    data.append("pk_task", pk_task);

    const response = await axios({
        method: "post",
        url: "/app/delete/task",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        },
    })
    return response;
}


export const updateUserName = async (newUserName) => {

    let data = new FormData();
    data.append("newUserName", newUserName);

    const response = await axios({
        method: "post",
        url: "/app/update/account/username",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const updatePassword = async (newPassword) => {

    let data = new FormData();
    data.append("newPassword", newPassword);

    const response = await axios({
        method: "post",
        url: "/app/update/account/password",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}

export const checkPassword = async (password) => {

    let data = new FormData();
    data.append("password", password);

    const response = await axios({
        method: "post",
        url: "/auth/checkPassword",
        data: data,
        headers: {
            'X-CSRFTOKEN': Cookies.get('csrftoken'),
        }
    })
    return response;
}