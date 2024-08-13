import React, { useState } from 'react';

const MemberPassword = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [passwordType, setPasswordType] = useState('');
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const openEditDialog = (type, id) => {
        setPasswordType(type);
        setUserId(id);
        setDialogOpen(true);
    };

    const closeEditDialog = () => {
        setDialogOpen(false);
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        alert(`Password for ${passwordType} of user ${userId} has been updated.`);
        closeEditDialog();
    };

    return (
        <div>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #333;
                    color: #fff;
                    margin: 0;
                    padding: 0;
                }

                .container {
                    width: 90%;
                    margin: 20px auto;
                    background-color: #444;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }

                h1 {
                    text-align: center;
                    color: #0f9d58;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                table, th, td {
                    border: 1px solid #555;
                }

                th, td {
                    padding: 10px;
                    text-align: left;
                }

                th {
                    background-color: #666;
                }

                tr:nth-child(even) {
                    background-color: #555;
                }

                tr:nth-child(odd) {
                    background-color: #444;
                }

                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    color: #fff;
                    font-size: 14px;
                    margin: 2px;
                }

                .login-password-btn {
                    background-color: #2196F3;
                }

                .transaction-password-btn {
                    background-color: #f44336;
                }

                .edit-dialog {
                    display: ${isDialogOpen ? 'block' : 'none'};
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 300px;
                    background-color: #555;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }

                .edit-dialog h2 {
                    margin-top: 0;
                }

                .edit-dialog input[type="password"] {
                    width: calc(100% - 20px);
                    padding: 10px;
                    margin-bottom: 10px;
                    border: none;
                    border-radius: 4px;
                    background-color: #666;
                    color: #fff;
                }

                .edit-dialog button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    background-color: #0f9d58;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                }

                .edit-dialog button:hover {
                    background-color: #0e8c4e;
                }
                `}
            </style>

            <div className="container">
                <h1>Member Password Management</h1>
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>User ID</th>
                            <th>Action - Login Password</th>
                            <th>Action - Transaction Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>2024-07-26</td>
                            <td>John Doe</td>
                            <td>john123</td>
                            <td>
                                <button
                                    className="login-password-btn"
                                    onClick={() => openEditDialog('login', 'john123')}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    className="transaction-password-btn"
                                    onClick={() => openEditDialog('transaction', 'john123')}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>2024-07-26</td>
                            <td>Jane Smith</td>
                            <td>jane456</td>
                            <td>
                                <button
                                    className="login-password-btn"
                                    onClick={() => openEditDialog('login', 'jane456')}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    className="transaction-password-btn"
                                    onClick={() => openEditDialog('transaction', 'jane456')}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>

            {/* Edit Dialog */}
            <div className="edit-dialog">
                <h2>Edit Password</h2>
                <form id="editForm" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input type="hidden" id="passwordType" value={passwordType} />
                    <input type="hidden" id="userId" value={userId} />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={closeEditDialog}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default MemberPassword;
