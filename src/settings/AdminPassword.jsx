import React, { useState } from 'react';

const AdminPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 1, // Assuming the user ID is 1 for this example
                    oldPassword,
                    newPassword,
                }),
            });

            if (response.ok) {
                alert('Password change request submitted.');
            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText}`);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred. Please try again.');
        }
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
                    width: 50%;
                    margin: 40px auto;
                    background-color: #444;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }

                h1 {
                    text-align: center;
                    color: #0f9d58;
                }

                .form-group {
                    margin-bottom: 15px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                .form-group input[type="password"] {
                    width: calc(100% - 20px);
                    padding: 10px;
                    border: none;
                    border-radius: 4px;
                    background-color: #666;
                    color: #fff;
                }

                .form-group input[type="submit"] {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    background-color: #0f9d58;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                }

                .form-group input[type="submit"]:hover {
                    background-color: #0e8c4e;
                }
                `}
            </style>

            <div className="container">
                <h1>Change Admin Password</h1>
                <form id="passwordForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPassword;
