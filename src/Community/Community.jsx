import React, { useState, useEffect } from 'react';
import './Community.css';

const Community = () => {
    const [members, setMembers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMember, setEditMember] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/community'); // Replace with your actual URL
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const openEditModal = (member) => {
        setEditMember(member);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditMember(null);
    };

    const saveChanges = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/community/add-community-member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editMember),
            });
            if (response.ok) {
                fetchMembers();
                closeEditModal();
            } else {
                console.error('Error updating member');
            }
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditMember((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const changeStatus = async (id) => {
        // Implement the change status functionality here
        alert('Change member status functionality goes here.');
    };

    const openMemberDashboard = () => {
        alert('Member dashboard would open here.');
    };

    return (
        <div className="container">
            <h1 className="heading">Community Dashboard</h1>
            <div className="section">
                <h2 className="subheading">Members Profile</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Date of Joining</th>
                            <th>Name</th>
                            <th>Mobile No.</th>
                            <th>User ID</th>
                            <th>Email ID</th>
                            <th>Wallet Address</th>
                            <th>KYC Status</th>
                            <th>No. of Staked Coins</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td>{member.date_of_joining}</td>
                                <td>{member.name}</td>
                                <td>{member.mobile_no}</td>
                                <td>{member.user_id}</td>
                                <td>{member.email_id}</td>
                                <td>{member.wallet_address}</td>
                                <td>{member.kyc_status}</td>
                                <td>{member.staked_coins}</td>
                                <td>
                                    <button className="button editBtn" onClick={() => openEditModal(member)}>Edit</button>
                                    <button className="button loginBtn" onClick={openMemberDashboard}>Log In</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h2 className="subheading">Active/Inactive Members</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Profile ID</th>
                            <th>Wallet Address</th>
                            <th>No. of Staked Coins</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1}</td>
                                <td>{member.user_id}</td>
                                <td>{member.name}</td>
                                <td>{member.id}</td>
                                <td>{member.wallet_address}</td>
                                <td>{member.staked_coins}</td>
                                <td>{member.kyc_status}</td>
                                <td>
                                    <button className="button changeStatusBtn" onClick={() => changeStatus(member.id)}>Change Status</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditModalOpen && (
                <div className="modal" onClick={closeEditModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <span className="closeBtn" onClick={closeEditModal}>&times;</span>
                        <h2>Edit Profile</h2>
                        <form onSubmit={saveChanges}>
                            <label htmlFor="wallet_address">Wallet Address:</label>
                            <input
                                type="text"
                                id="wallet_address"
                                name="wallet_address"
                                value={editMember.wallet_address}
                                onChange={handleChange}
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={editMember.password}
                                onChange={handleChange}
                            />

                            <label htmlFor="transaction_password">Transaction Password:</label>
                            <input
                                type="password"
                                id="transaction_password"
                                name="transaction_password"
                                value={editMember.transaction_password}
                                onChange={handleChange}
                            />

                            <button type="submit" className="button saveBtn">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;
