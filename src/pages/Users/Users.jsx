import React, { useState, useEffect } from 'react';

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
        setNewRole(user.role); // Mevcut kullanıcının rolünü set ediyoruz
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
        <div className="container">
            <h2>Benutzer Verwaltung</h2>
            <table className="table table-striped">
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
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditUser(user)}>
                                Bearbeiten
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.email)}>
                                Löschen
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Bearbeitungs-Modal */}
            {showEditModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Benutzer Bearbeiten</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Name:</strong> {selectedUser?.name}</p>
                                <p><strong>E-Mail:</strong> {selectedUser?.email}</p>
                                <div className="mb-3">
                                    <label className="form-label">Neue Rolle:</label>
                                    <select className="form-select" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                                        <option value="">Auswählen</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">Benutzer</option>
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
