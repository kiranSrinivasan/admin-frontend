import React, { useState, useEffect } from 'react';

const DepositHistory = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/deposits');
      const data = await response.json();
      setDeposits(data);
    } catch (error) {
      console.error('Error fetching deposits:', error);
    }
  };

  const styles = {
    container: {
      width: '90%',
      margin: '20px auto',
      backgroundColor: 'rgba(68, 68, 68, 0.8)', // Semi-transparent background
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      overflowX: 'auto', // Allows horizontal scrolling if necessary
    },
    body: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundSize: 'cover',
      backdropFilter: 'blur(10px)',
      color: '#fff',
    },
    h1: {
      textAlign: 'center',
      color: '#0f9d58',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '20px 0',
    },
    th: {
      border: '1px solid #555',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#666',
    },
    td: {
      border: '1px solid #555',
      padding: '10px',
      textAlign: 'left',
    },
    trEven: {
      backgroundColor: '#555',
    },
    trOdd: {
      backgroundColor: '#444',
    },
    statusProcessing: {
      color: '#ffa500',
    },
    statusApproved: {
      color: '#4caf50',
    },
    statusRejected: {
      color: '#f44336',
    },
    a: {
      color: '#0f9d58',
      textDecoration: 'none',
    },
    aHover: {
      textDecoration: 'underline',
    },
    '@media (max-width: 768px)': {
      h1: {
        fontSize: '24px',
      },
      table: {
        fontSize: '14px',
      },
      container: {
        padding: '15px',
      },
    },
    '@media (max-width: 480px)': {
      h1: {
        fontSize: '20px',
      },
      table: {
        fontSize: '12px',
      },
      container: {
        padding: '10px',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Deposit History</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Serial No.</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>User ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Transaction Hash</th>
            <th style={styles.th}>Wallet Address</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit, index) => (
            <tr key={deposit.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
              <td>{index + 1}</td>
              <td>{deposit.date}</td>
              <td>{deposit.user_id}</td>
              <td>{deposit.name}</td>
              <td>{deposit.amount}</td>
              <td>{deposit.transaction_hash}</td>
              <td>{deposit.wallet_address}</td>
              <td style={styles[`status${deposit.status}`]}>{deposit.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepositHistory;
