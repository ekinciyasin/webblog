const users = [
    {
        id: 1,
        name: "aasin",
        email: "yasin@example.com",
        password: "passwor",
        role: "user"
    },
    {
        id: 2,
        name: "Mats",
        email: "mats@example.com",
        password: "password456"
    }

];

export function signUpUser(name, email, password){

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
     console.log("User created successfully", newUser);
    return newUser;
}

export default users;