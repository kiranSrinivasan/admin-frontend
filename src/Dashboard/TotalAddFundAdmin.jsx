import React, { useState, useEffect } from 'react';

const TotalAddFundAdmin = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/addfunds?search=${encodeURIComponent(searchTerm)}`);
                const result = await response.json();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchTerm]);

    useEffect(() => {
        filterData();
    }, [data, searchTerm, currentPage]);

    const filterData = () => {
        const filtered = data.filter(row =>
            row.senderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.sendToId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.sendToName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.ngmValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.status.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const displayTable = () => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end).map((row, index) => (
            <tr key={start + index}>
                <td>{start + index + 1}</td>
                <td>{row.senderId}</td>
                <td>{row.sendToId}</td>
                <td>{row.sendToName}</td>
                <td>{row.ngmValue}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
            </tr>
        ));
    };

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div style={styles.container}>
            <div style={styles.searchBar}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    style={styles.searchInput}
                />
                <button
                    onClick={() => {
                        setCurrentPage(1);
                        filterData();
                    }}
                    style={styles.searchButton}
                >
                    Search
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Sender ID</th>
                        <th>Send To ID</th>
                        <th>Send To Name</th>
                        <th>NGM Value</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTable()}
                </tbody>
            </table>
            <ul style={styles.pagination}>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(1);
                        }}
                        style={styles.paginationLink}
                    >
                        First
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        style={styles.paginationLink}
                    >
                        Previous
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        style={styles.paginationLink}
                    >
                        Next
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(totalPages);
                        }}
                        style={styles.paginationLink}
                    >
                        Last
                    </a>
                </li>
            </ul>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(/path/to/your/image.jpg)', // Adjust path as needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchBar: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        gap: '10px',
    },
    searchInput: {
        flex: 1,
        padding: '10px',
        fontSize: '1em',
        border: '1px solid #ccc',
        borderRadius: '4px',
        outline: 'none',
    },
    searchButton: {
        padding: '10px 20px',
        fontSize: '1em',
        border: 'none',
        backgroundColor: '#6c63ff',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '4px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        background: 'rgba(255, 255, 255, 0.1)',
    },
    pagination: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: '20px 0 0',
        gap: '5px',
    },
    paginationLink: {
        padding: '10px 15px',
        backgroundColor: '#f1f1f1',
        border: '1px solid #ccc',
        textDecoration: 'none',
        color: '#333',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default TotalAddFundAdmin;
