const users = [
    {
        id: 1,
        username: "Yasin",
        email: "yasin@gmail.com",
        password: "password",
        role: "USER"
    },
    {
        id: 2,
        username: "Mats",
        email: "mats@gmail.com",
        password: "1111",
        role: "ADMIN"
    }
];

const initializeUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedUsers.length === 0) {
        localStorage.setItem('users', JSON.stringify(users));
    }
};

initializeUsers();



export default users;