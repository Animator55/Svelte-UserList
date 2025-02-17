import { __auth, __editUser, __getUserById, __getUsers, __newUser, __removeUser } from ".";
import axios from "../../node_modules/axios/index";

export type userType = {
    _id: string;
    guid: string;
    balance: string;
    name: string;
    gender: string;
    email: string;
    phone: string;
    [key: string]: string
}

export type userDataType = {
    name: string
    gender: string
    email: string
    phone: string
}


export const _getUsers = async (query: string, offline: boolean)=>{
    if(query === "") return 
    let result = offline ? __getUsers(query) :
    axios.get("http://localhost:3000?q="+query).then((response) => {
        return response.data
    });
    return result
}
export const _getUserById = async (id: string, offline: boolean)=>{
    if(id === "") return 
    let result = offline ? __getUserById(id):
    axios.get("http://localhost:3000/user/?_id="+id).then((response) => {
        return response.data
    });
    return result
}

export const _newUser = async (newUser: userDataType, offline: boolean)=>{
    if(!newUser) return 
    let result = offline ? __newUser(newUser):
    axios.post("http://localhost:3000/create_user", newUser).then((response) => {
        return response.data
    });
    return result
    
}
export const _editUser = async (userData: userType, offline: boolean)=>{
    if(!userData) return 
    let result = offline ? __editUser(userData):
    axios.put("http://localhost:3000/edit_user", userData).then((response) => {
        return response.data
    });
    return result
}
export const _removeUser = async (id: string, offline: boolean)=>{
    if(id === "") return 
    let result = offline ? __removeUser(id) : 
    axios.delete("http://localhost:3000/delete_user?_id="+id).then((response) => {
        return response.data
    });
    return result
}



export const _auth=(email:string, password: string, offline: boolean)=>{
    if(email === "" || password === "") return {
        title: "Login Failed",
        content: "Complete all inputs.",
        icon: "warn",
        _id: `${Math.random()}`
    }
    let result = offline ? __auth(email, password):
    axios.get("http://localhost:3000/auth?e="+email+"&p="+password).then((response) => {
        return response.data
    });
    return result
}