import React, { useState, useEffect } from 'react';

const TotalActiveMembers = () => {
    const [members, setMembers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`/api/members?search=${encodeURIComponent(searchValue)}`);
                const data = await response.json();
                setMembers(data.members);
                setTotalMembers(data.members.length);
            } catch (error) {
                console.error('Error fetching members:', error);
                setMembers([]);
            }
        };

        fetchMembers();
    }, [searchValue]);

    useEffect(() => {
        displayPage(currentPage);
    }, [currentPage, members]);

    const displayPage = (page) => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedMembers = members.slice(start, end);

        return paginatedMembers.map((member, index) => (
            <tr key={member.id}>
                <td>{start + index + 1}</td>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.referralId}</td>
                <td>{member.main}</td>
                <td>{member.withdrawal}</td>
                <td>
                    <button className="edit-btn" onClick={() => editMember(member.id)}>Edit</button>
                    <button className="login-btn" onClick={() => loginMember(member.id)}>Login</button>
                </td>
            </tr>
        ));
    };

    const setupPagination = (totalRows, rowsPerPage, currentPage) => {
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        const buttons = [];

        if (currentPage > 1) {
            buttons.push(<button key="first" onClick={() => setCurrentPage(1)}>First</button>);
            buttons.push(<button key="prev" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>);
        }

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < totalPages) {
            buttons.push(<button key="next" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>);
            buttons.push(<button key="last" onClick={() => setCurrentPage(totalPages)}>Last</button>);
        }

        return buttons;
    };

    const searchMembers = async () => {
        setCurrentPage(1);
        const fetchMembers = async () => {
            try {
                const response = await fetch(`/api/members?search=${encodeURIComponent(searchValue)}`);
                const data = await response.json();
                setMembers(data.members);
                setTotalMembers(data.members.length);
            } catch (error) {
                console.error('Error fetching members:', error);
                setMembers([]);
            }
        };

        fetchMembers();
    };

    const editMember = (memberId) => {
        console.log(`Edit member with ID: ${memberId}`);
    };

    const loginMember = (memberId) => {
        console.log(`Login as member with ID: ${memberId}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h3>Total Active Members</h3>
                <p>{totalMembers}</p>
            </div>
            <div style={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={styles.searchInput}
                />
                <button onClick={searchMembers} style={styles.searchButton}>Search</button>
            </div>
            <div style={styles.tableContainer}>
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
                        {displayPage(currentPage)}
                    </tbody>
                </table>
            </div>
            <div style={styles.pagination}>
                {setupPagination(members.length, rowsPerPage, currentPage)}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(web eg - 02.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#333',
        margin: 0,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    box: {
        width: '100%',
        maxWidth: '300px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
        padding: '15px'
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px'
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px 0 0 5px',
        outline: 'none',
        boxSizing: 'border-box',
        marginBottom: '10px'
    },
    searchButton: {
        padding: '10px',
        backgroundColor: '#6c5ce7',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    tableContainer: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        background: 'white',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    pagination: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px'
    }
};

export default TotalActiveMembers;
