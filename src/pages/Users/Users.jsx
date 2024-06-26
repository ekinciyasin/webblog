import React, { useState, useEffect } from 'react';
import './Users.css'; // CSS dosyasını içe aktar

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleDeleteUser = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
        setNewRole(user.role);
    };

    const handleUpdateUserRole = () => {
        if (selectedUser && newRole !== '') {
            const updatedUsers = users.map(user => {
                if (user.email === selectedUser.email) {
                    return { ...user, role: newRole };
                }
                return user;
            });
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setShowEditModal(false);
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
                            <button className="user-btn user-btn-danger" onClick={() => handleDeleteUser(user.email)}>
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
                        <div className="user-modal-content">
                            <div className="user-modal-header">
                                <h5 className="user-modal-title">Benutzer Bearbeiten</h5>
                                <button type="button" className="user-btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Name:</strong> {selectedUser?.username}</p>
                                <p><strong>E-Mail:</strong> {selectedUser?.email}</p>
                                <div className="mb-3">
                                    <label className="form-label">Neue Rolle:</label>
                                    <select className="user-form-select" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                                        <option value="">Auswählen</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">Benutzer</option>
                                    </select>
                                </div>
                            </div>
                            <div className="user-modal-footer">
                                <button type="button" className="user-btn user-btn-secondary" onClick={() => setShowEditModal(false)}>Abbrechen</button>
                                <button type="button" className="user-btn user-btn-primary" onClick={handleUpdateUserRole}>Speichern</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
