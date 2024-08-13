// TotalRegistrationToday.jsx
import React, { useState, useEffect } from 'react';

const TotalRegistrationToday = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search })
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.totalBox}>
                <h3>Total Users</h3>
                <p>{users.length}</p>
            </div>
            <div style={styles.totalBox}>
                <h3>Total Registrations Today</h3>
                <p>{users.filter(user => new Date(user.joined).toDateString() === new Date().toDateString()).length}</p>
            </div>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
                <button onClick={handleSearch} style={styles.searchButton}>Search</button>
            </div>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Joined</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>User ID</th>
                            <th>E-Mail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.userId}>
                                <td>{index + 1}</td>
                                <td>{new Date(user.joined).toLocaleDateString()}</td>
                                <td>{user.name}</td>
                                <td>{user.mobile}</td>
                                <td>{user.userId}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => console.log(`Edit user with ID: ${user.userId}`)}>Edit</button>
                                    <button onClick={() => console.log(`Login as user with ID: ${user.userId}`)}>Login</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(web/eg - 02.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
    },
    totalBox: {
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px 0 0 5px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    searchButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '5px',
        width: '100%',
        marginTop: '5px',
    },
    tableContainer: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
};

export default TotalRegistrationToday;
