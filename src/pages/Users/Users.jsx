import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';
import { deleteUser, getUsers } from "./api"; // CSS file import

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
            const updatedUser = { ...selectedUser, role: newRole };
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
            <h2 className="user-heading">Benutzer Verwaltung</h2>
            <table className="user-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Rolle</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.email}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className="user-btn user-btn-primary me-2" onClick={() => handleEditUser(user)}>
                                Bearbeiten
                            </button>
                            <button className="user-btn user-btn-danger" onClick={() => handleDeleteUser(user.id)}>
                                Löschen
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showEditModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Benutzer Bearbeiten</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Name:</strong> {selectedUser?.username}</p>
                                <p><strong>E-Mail:</strong> {selectedUser?.email}</p>
                                <div className="mb-3">
                                    <label className="form-label">Neue Rolle:</label>
                                    <select className="form-select" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                                        <option value="">Auswählen</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="USER">Benutzer</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Abbrechen</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdateUserRole}>Speichern</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
