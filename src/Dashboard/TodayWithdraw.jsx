import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'jszip';
import 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';

const TodayWithdraw = () => {
  useEffect(() => {
    const data = [
      { sno: 1, select: '', memberId: 'FCT00001', customerName: 'John Doe', withdrawAmount: '₹1000.00', punchTimes: '2024-07-29 10:00 AM', status: 'Pending', usdt: '0.00', fctc: '0.00' },
      { sno: 2, select: '', memberId: 'FCT00002', customerName: 'Jane Doe', withdrawAmount: '₹2000.00', punchTimes: '2024-07-29 11:00 AM', status: 'Pending', usdt: '0.00', fctc: '0.00' },
      // Add more data as needed
    ];

    $('#withdraw-history').DataTable({
      data: data,
      columns: [
        { data: 'sno' },
        { data: 'select', render: () => '<input type="checkbox">' },
        { data: 'memberId' },
        { data: 'customerName' },
        { data: 'withdrawAmount' },
        { data: 'punchTimes' },
        { data: 'status' },
        { data: 'usdt' },
        { data: 'fctc' },
      ],
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      responsive: true
    });

    $('#transfer-to-paid').click(() => {
      alert('Transfer to Paid button clicked');
    });
  }, []);

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("path/to/your/image.jpg")', // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'black',
    margin: 0,
    padding: 0,
    minHeight: '100vh'
  };

  const boxStyle = {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
    padding: '15px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const btnStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    textAlign: 'center'
  };

  const btnHoverStyle = {
    ...btnStyle,
    backgroundColor: '#0056b3'
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h3>Total Balance Fund</h3>
        <p id="total-balance-fund">₹50,000.00</p>
      </div>
      <table id="withdraw-history" className="display" style={tableStyle}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Select</th>
            <th>Member Id</th>
            <th>Customer Name</th>
            <th>Withdraw Amount</th>
            <th>Punch Times</th>
            <th>Status</th>
            <th>USDT</th>
            <th>FCTC</th>
          </tr>
        </thead>
        <tbody>
          {/* Data will be inserted by DataTables */}
        </tbody>
      </table>
      <button id="transfer-to-paid" style={btnStyle} onMouseOver={e => e.currentTarget.style = btnHoverStyle} onMouseOut={e => e.currentTarget.style = btnStyle}>
        Transfer to Paid
      </button>
    </div>
  );
};

export default TodayWithdraw;
