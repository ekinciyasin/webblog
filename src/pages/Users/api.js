import axios from "axios";

export  async function getUsers() {
    try{
        return await axios.get('http://localhost:3005/users');
    }catch (e) {
        new Error('Could not fetch users');
    }

}

export  async function deleteUser(id) {
        try {
            await axios.delete(`http://localhost:3005/users/${id}`);
        } catch (error) {
           throw new Error('Could not delete user');
        }


}

