import React, { useState, useEffect } from 'react';

const TotalUsers = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/users')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setFilteredData(data);
                document.getElementById('total-users').textContent = data.length;
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const loadPage = (page) => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end);
    };

    const handleSearch = () => {
        const query = search.toLowerCase();
        const result = data.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.mobile.includes(query) ||
            user.userId.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
        setFilteredData(result);
        setCurrentPage(1);
    };

    const handleEdit = (userId) => {
        alert('Edit user: ' + userId);
    };

    const handleLogin = (userId) => {
        alert('Login as user: ' + userId);
    };

    const paginatedData = loadPage(currentPage);

    return (
        <div style={containerStyle}>
            <div style={dashboardStyle}>
                <div style={totalUsersBoxStyle}>
                    <h3>Total Users</h3>
                    <p id="total-users">0</p>
                </div>
                <div style={searchBarStyle}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={searchInputStyle}
                    />
                    <button
                        onClick={handleSearch}
                        style={searchButtonStyle}
                    >
                        Search
                    </button>
                </div>
                <div style={tableContainerStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>S.No</th>
                                <th style={thStyle}>Joined</th>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Mobile</th>
                                <th style={thStyle}>User ID</th>
                                <th style={thStyle}>E-Mail</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={item.id} style={index % 2 === 0 ? trEvenStyle : {}}>
                                    <td style={thTdStyle}>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                    <td style={thTdStyle}>{item.joined}</td>
                                    <td style={thTdStyle}>{item.name}</td>
                                    <td style={thTdStyle}>{item.mobile}</td>
                                    <td style={thTdStyle}>{item.userId}</td>
                                    <td style={thTdStyle}>{item.email}</td>
                                    <td style={thTdStyle}>
                                        <div style={actionButtonsStyle}>
                                            <button
                                                onClick={() => handleEdit(item.userId)}
                                                style={editBtnStyle}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleLogin(item.userId)}
                                                style={loginBtnStyle}
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={paginationStyle}>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={paginationButtonStyle}
                    >
                        Previous
                    </button>
                    {[...Array(Math.ceil(filteredData.length / rowsPerPage)).keys()].map((i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            style={{
                                ...paginationButtonStyle,
                                ...(i + 1 === currentPage && paginationButtonActiveStyle),
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
                        style={paginationButtonStyle}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

// Styles
const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("web eg - 02.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#333',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
};

const dashboardStyle = {
    width: '90%',
    maxWidth: '1200px',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
};

const totalUsersBoxStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const searchBarStyle = {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '20px',
};

const searchInputStyle = {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px 0 0 5px',
    outline: 'none',
};

const searchButtonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '0 5px 5px 0',
    transition: 'background-color 0.3s',
};

const tableContainerStyle = {
    width: '100%',
    overflowX: 'auto',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    minWidth: '600px',
};

const thTdStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

const thStyle = {
    backgroundColor: '#f4f4f4',
};

const trEvenStyle = {
    backgroundColor: '#f9f9f9',
};

const actionButtonsStyle = {
    display: 'flex',
    gap: '5px',
};

const editBtnStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
    padding: '5px 10px',
    transition: 'background-color 0.3s',
};

const loginBtnStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
    padding: '5px 10px',
    transition: 'background-color 0.3s',
};

const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
};

const paginationButtonStyle = {
    margin: '5px',
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
};

const paginationButtonActiveStyle = {
    backgroundColor: '#007bff',
    color: 'white',
};

export default TotalUsers;
