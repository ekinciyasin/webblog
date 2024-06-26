import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Users.css';
import {deleteUser, getUsers} from "./api";
import Modal from "./components/Modal";

; // CSS file import

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        };
        fetchUsers();
    }, []);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setShowEditModal(true);
    };

    const handleUpdateUserRole = async () => {
        try {
            const updatedUser = {...selectedUser, role: newRole};
            await axios.put(`http://localhost:3005/users/${selectedUser.id}`, updatedUser);
            setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
            setShowEditModal(false);
        } catch (error) {
            console.error("There was an error updating the user role!", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    return (
        <div className="user-container">
            <h1 className="user-heading">Benutzer Verwaltung</h1>
            <div className="custom-collapse">
                <table className="user-table">
                    <thead>
                    <tr className="table-header">
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Rolle</th>
                        <th className="aktionen">
                            <div>Aktionen</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.email}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="bearbeiten-loeschen-btn-div">
                                <div className="edit-btn-div" onClick={() => handleEditUser(user)}>
                                    Bearbeiten
                                </div>
                                <div className="delete-btn-div" onClick={() => handleDeleteUser(user.id)}>
                                    Löschen
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Modal
                show={showEditModal}
                user={selectedUser}
                newRole={newRole}
                setNewRole={setNewRole}
                handleClose={() => setShowEditModal(false)}
                handleSave={handleUpdateUserRole}
            />
        </div>

    );
};

export default Users;
