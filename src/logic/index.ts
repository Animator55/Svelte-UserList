import { usersDefault } from './usersDefault.js'
import { admins } from './admins.js'
import type { userDataType, userType } from '../vite-env.js';

export const __getUsers = (query: string) => {
    var regex = new RegExp(query, "i");
    let result = usersDefault.filter(el => {
        if (query === "" || regex.test(el.name)) return el
    })

    return (result)
}
export const __getUserById = (userId:string) => {
    let user = usersDefault.find((el) => { if (el._id === userId) return el })
    return (user)
}
export const __newUser = (userData: userDataType) => {
    let newUserComplete = {
        ...userData,
        _id: `${Math.random() + "." + Math.random()}`,
        guid: `insert guid`,
        balance: "0",
    }
    usersDefault.push(newUserComplete)
    return ({
        title: "New User Created",
        content: "The user " + newUserComplete.name + " has been created.",
        icon: "check",
        _id: `${Math.random()}`
    })
}
export const __editUser = (userData: userType) => {
    let index = -1
    if (!userData) return ({
        title: "User not found",
        content: "User id not founded, retry later.",
        icon: "xmark",
        _id: `${Math.random()}`
    })
    for (let i = 0; i < usersDefault.length; i++) {
        if (usersDefault[i]._id === userData._id) {
            index = i
            break
        }
    }
    if (index === -1) return ({
        title: "User not found",
        content: "User id not founded, retry later.",
        icon: "xmark",
        _id: `${Math.random()}`
    })
    usersDefault.splice(index, 1, userData)
    return ({
        title: "User edited",
        content: "The user " + userData.name + " has been succesfully edited.",
        icon: "check",
        _id: `${Math.random()}`
    })
}
export const __removeUser = (id: string) => {
    let index = -1
    for (let i = 0; i < usersDefault.length; i++) {
        if (usersDefault[i]._id === id) {
            index = i
            break
        }
    }
    if (index === -1) return ({
        title: "User not found",
        content: "User id not founded, retry later.",
        icon: "xmark",
        _id: `${Math.random()}`
    })
    let name = usersDefault[index].name
    usersDefault.splice(index, 1)
    return ({
        title: "User edited",
        content: "The user " + name + " has been succesfully removed.",
        icon: "check",
        _id: `${Math.random()}`
    })
}
export const __auth = (email:string, password:string) => {
    if (email === "" || password === "") return ({
        title: "Login Failed",
        content: "Complete all inputs.",
        icon: "warn",
        _id: `${Math.random()}`
    })
    let boolean = admins.some(el => {
        if (el.email === email && el.password === password) return true
    })
    return boolean ? ({
        title: "Login",
        content: "Logged succesfully.",
        icon: "check",
        _id: `${Math.random()}`
    })
    :
    ({
        title: "Login Failed",
        content: "The email or password is incorrect.",
        icon: "xmark",
        _id: `${Math.random()}`
    })
}

