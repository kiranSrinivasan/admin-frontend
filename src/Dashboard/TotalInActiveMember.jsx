import React, { useState, useEffect } from 'react';

const TotalInActiveMember = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const totalPages = Math.ceil(data.length / rowsPerPage);

    useEffect(() => {
        const fetchInactiveMembers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/inactive-members');
                const result = await response.json();
                setData(result.members);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInactiveMembers();
    }, []);

    const displayTable = (page) => {
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage;
        return data.slice(start, end);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        document.getElementById('total-inactive-members').textContent = data.length;
    }, [data]);

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h3>Total Inactive Members</h3>
                <p id="total-inactive-members">0</p>
            </div>
            <div style={styles.searchBar}>
                <input type="text" placeholder="Search" />
                <button>Search</button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Referral ID</th>
                        <th>Main</th>
                        <th>Withdrawal</th>
                        <th>Activate</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTable(currentPage).map((row, index) => (
                        <tr key={row.id}>
                            <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.referralId}</td>
                            <td>{row.main}</td>
                            <td>{row.withdrawal}</td>
                            <td><input type="text" value={row.activate} readOnly /><button>Activate</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul style={styles.pagination}>
                <li><a href="#" onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'disabled' : ''}>First</a></li>
                <li><a href="#" onClick={() => handlePageChange(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>Previous</a></li>
                <li><a href="#" onClick={() => handlePageChange(currentPage + 1)} className={currentPage === totalPages ? 'disabled' : ''}>Next</a></li>
                <li><a href="#" onClick={() => handlePageChange(totalPages)} className={currentPage === totalPages ? 'disabled' : ''}>Last</a></li>
            </ul>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(web eg - 02.jpg)', // Update the path as needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    box: {
        width: '100%',
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
        padding: '20px',
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    pagination: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
        margin: '20px 0 0',
        width: '100%',
    },
};

export default TotalInActiveMember;
