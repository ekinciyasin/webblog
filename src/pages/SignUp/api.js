import axios from "axios";
import users from "../../data/users";
import {login} from "../Login/api";
//database
export function signUpWithBackend(body){
    return axios.post('/api/v1/users', body)
}

//
export async function signUp(body) {
    const { email } = body;


    const response = await axios.get(`http://localhost:3005/users?email=${email}`);
    if (response.data.length > 0) {
        throw new Error("Diese E-Mail-Adresse existiert bereits.");
    }


    const newUserResponse = await axios.post('http://localhost:3005/users', body);
    return newUserResponse.data;
}


export function  signUpUser(name, email, password) {

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "user"
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', true);
    return newUser;
}
