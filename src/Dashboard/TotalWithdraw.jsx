import React, { useState, useEffect } from 'react';

const TotalWithdraw = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 10;

    useEffect(() => {
        fetch('http://localhost:5000/api/withdrawals')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = () => {
        fetch('http://localhost:5000/api/withdrawals/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: searchTerm })
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error searching data:', error));
        setCurrentPage(1);
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const filteredData = data.filter(item => 
        item.senderId.includes(searchTerm) || 
        item.sendToId.includes(searchTerm) || 
        item.sendToName.includes(searchTerm) || 
        item.ngmValue.includes(searchTerm) || 
        item.date.includes(searchTerm) || 
        item.status.includes(searchTerm)
    );

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundImage: 'url(web eg - 02.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#333',
            margin: 0,
            padding: 0
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginBottom: '20px' }}>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={handleKeyUp}
                        style={{
                            padding: '10px',
                            fontSize: '1em',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            outline: 'none',
                            flex: 1
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            padding: '10px 20px',
                            fontSize: '1em',
                            border: 'none',
                            backgroundColor: '#6c63ff',
                            color: 'white',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            marginTop: '10px'
                        }}
                    >
                        Search
                    </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255, 255, 255, 0.8)' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.3)' }}>S.No</th>
                            <th style={{ padding: '10px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.3)' }}>Sender ID</th>
                            <th style={{ padding: '10px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.3)' }}>Send To ID</th>
                            <th style={{ padding: '10px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.3)' }}>Send To Name</th>
                            <th style={{ padding: '10px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.3)' }}>NGM Value</th>
                            <th style={{ padding: '10px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.3)' }}>Date</th>
                            <th style={{ padding: '10px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.3)' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px' }}>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                <td style={{ padding: '10px' }}>{row.senderId}</td>
                                <td style={{ padding: '10px' }}>{row.sendToId}</td>
                                <td style={{ padding: '10px' }}>{row.sendToName}</td>
                                <td style={{ padding: '10px' }}>{row.ngmValue}</td>
                                <td style={{ padding: '10px' }}>{row.date}</td>
                                <td style={{ padding: '10px' }}>{row.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: '20px 0 0', justifyContent: 'center' }}>
                    <li style={{ margin: '0 5px' }}>
                        <a
                            href="#"
                            onClick={() => setCurrentPage(1)}
                            style={{ padding: '10px 15px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', textDecoration: 'none', color: '#333' }}
                        >
                            First
                        </a>
                    </li>
                    <li style={{ margin: '0 5px' }}>
                        <a
                            href="#"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            style={{ padding: '10px 15px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', textDecoration: 'none', color: '#333' }}
                            className={currentPage === 1 ? 'disabled' : ''}
                        >
                            Previous
                        </a>
                    </li>
                    <li style={{ margin: '0 5px' }}>
                        <a
                            href="#"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            style={{ padding: '10px 15px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', textDecoration: 'none', color: '#333' }}
                            className={currentPage === totalPages ? 'disabled' : ''}
                        >
                            Next
                        </a>
                    </li>
                    <li style={{ margin: '0 5px' }}>
                        <a
                            href="#"
                            onClick={() => setCurrentPage(totalPages)}
                            style={{ padding: '10px 15px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', textDecoration: 'none', color: '#333' }}
                            className={currentPage === totalPages ? 'disabled' : ''}
                        >
                            Last
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TotalWithdraw;
