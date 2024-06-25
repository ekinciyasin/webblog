import axios from "axios";

export function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('userRole', user.role);
        return user;
    } else {
        return null;
    }
}

export async function login(email, password) {
    const response = await axios.get(`http://localhost:3005/users?email=${email}`);
    console.log("Antwort ", response.data);
    if (response.data.length === 0 || response.data[0].password!== password) {
        console.log("Benutzer nicht gefunden");
        throw new Error("Benutzer nicht gefunden");
    }


    return response.data[0];
}