import React, { useState, useEffect } from 'react';

const Wallet = () => {
    const [walletChanges, setWalletChanges] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/wallet-changes')
            .then((response) => response.json())
            .then((data) => setWalletChanges(data.filter(w => w.status === 'pending')))
            .catch((error) => console.error('Error fetching wallet changes:', error));
    }, []);

    const handleAccept = (id) => {
        updateWalletChangeStatus(id, 'accepted');
    };

    const handleReject = (id) => {
        updateWalletChangeStatus(id, 'rejected');
    };

    const updateWalletChangeStatus = (id, status) => {
        fetch('http://localhost:5000/api/wallet-changes/status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setWalletChanges(walletChanges.filter(w => w.id !== id));
            })
            .catch((error) => console.error('Error updating wallet change status:', error));
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
                    margin: 20px 0;
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

                .status-pending {
                    color: #ffa500;
                }

                .status-accepted {
                    color: #4caf50;
                }

                .status-rejected {
                    color: #f44336;
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

                .accept-btn {
                    background-color: #4CAF50;
                }

                .reject-btn {
                    background-color: #f44336;
                }
                `}
            </style>

            <div className="container">
                <h1>Wallet Change Requests</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Current Wallet Address</th>
                            <th>New Wallet Address</th>
                            <th>OTP Verified</th>
                            <th>Status</th>
                            <th>Action (Accept)</th>
                            <th>Action (Reject)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {walletChanges.map((change, index) => (
                            <tr key={change.id}>
                                <td>{index + 1}</td>
                                <td>{change.current_wallet_address}</td>
                                <td>{change.new_wallet_address}</td>
                                <td>{change.otp_verified ? 'Yes' : 'No'}</td>
                                <td className="status-pending">Pending</td>
                                <td>
                                    <button className="accept-btn" onClick={() => handleAccept(change.id)}>
                                        Accept
                                    </button>
                                </td>
                                <td>
                                    <button className="reject-btn" onClick={() => handleReject(change.id)}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Wallet;
