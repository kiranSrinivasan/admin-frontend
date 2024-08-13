import React, { useState, useEffect } from 'react';

const Reject = () => {
    const [rejectedWithdrawals, setRejectedWithdrawals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/withdrawals')
            .then((response) => response.json())
            .then((data) => setRejectedWithdrawals(data.filter(w => w.status === 'Rejected')))
            .catch((error) => console.error('Error fetching withdrawals:', error));
    }, []);

    const handleApprove = (id) => {
        updateWithdrawalStatus(id, 'Approved');
    };

    const updateWithdrawalStatus = (id, status) => {
        fetch('http://localhost:5000/api/withdrawals/status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setRejectedWithdrawals(rejectedWithdrawals.map(w => w.id === id ? { ...w, status } : w));
            })
            .catch((error) => console.error('Error updating withdrawal status:', error));
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

                .approve-btn {
                    background-color: #4CAF50;
                }

                .reject-btn {
                    background-color: #f44336;
                }

                .reason {
                    color: #f44336;
                }
                `}
            </style>

            <div className="container">
                <h1>Rejected Withdrawal Requests</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Member ID</th>
                            <th>Customer Name</th>
                            <th>Withdrawal Amount</th>
                            <th>Receiving Wallet Address</th>
                            <th>Status</th>
                            <th>Action (Approve)</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rejectedWithdrawals.map((withdrawal, index) => (
                            <tr key={withdrawal.id}>
                                <td>{index + 1}</td>
                                <td>{withdrawal.memberId}</td>
                                <td>{withdrawal.customerName}</td>
                                <td>${withdrawal.withdrawAmount}</td>
                                <td>{withdrawal.walletAddress}</td>
                                <td className="status-rejected">Rejected</td>
                                <td>
                                    <button className="approve-btn" onClick={() => handleApprove(withdrawal.id)}>
                                        Approve
                                    </button>
                                </td>
                                <td className="reason">{withdrawal.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reject;
