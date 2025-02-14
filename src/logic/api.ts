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


export const _getUsers = async (query: string)=>{
    if(query === "") return 
    let result = axios.get("http://localhost:3000?q="+query).then((response) => {
        return response.data
    });
    return result
}
export const _getUserById = async (id: string)=>{
    if(id === "") return 
    let result = axios.get("http://localhost:3000/user/?_id="+id).then((response) => {
        return response.data
    });
    return result
}

export const _newUser = async (newUser: userDataType)=>{
    if(!newUser) return 
    let result = axios.post("http://localhost:3000/create_user", newUser).then((response) => {
        return response.data
    });
    return result
    
}
export const _editUser = async (userData: userType)=>{
    if(!userData) return 
    let result = axios.put("http://localhost:3000/edit_user", userData).then((response) => {
        return response.data
    });
    return result
}
export const _removeUser = async (id: string)=>{
    if(id === "") return 
    let result = axios.delete("http://localhost:3000/delete_user?_id="+id).then((response) => {
        return response.data
    });
    return result
}



export const _auth=(email:string, password: string)=>{
    if(email === "" || password === "") return {
        title: "Login Failed",
        content: "Complete all inputs.",
        icon: "warn",
        _id: `${Math.random()}`
    }
    let result = axios.get("http://localhost:3000/auth?e="+email+"&p="+password).then((response) => {
        return response.data
    });
    return result
}