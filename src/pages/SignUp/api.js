import axios from "axios";
import users from "../../data/users";
//database
export function signUpWithBackend(body){
    return axios.post('/api/v1/users', body)
}

//
export function signUp(body){
return  axios.post('http://localhost:3005/users', body)

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
