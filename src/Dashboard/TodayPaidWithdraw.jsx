import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-responsive';

const TodayPaidWithdraw = () => {
    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/withdrawals/today');
                const data = await response.json();

                $('#withdraw-history').DataTable({
                    data: data,
                    columns: [
                        { data: 'id', title: 'S.No' },
                        { data: 'select', render: () => '<input type="checkbox">' },
                        { data: 'memberId', title: 'Member Id' },
                        { data: 'customerName', title: 'Customer Name' },
                        { data: 'withdrawAmount', title: 'Withdraw Amount' },
                        { data: 'punchTimes', title: 'Punch Times' },
                        { data: 'status', title: 'Status' },
                        { data: 'usdt', title: 'USDT' },
                        { data: 'fctc', title: 'FCTC' },
                    ],
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    responsive: true,
                    destroy: true, // Add this line to destroy the previous DataTable instance
                });

            } catch (error) {
                console.error('Error fetching withdrawals:', error);
            }
        };

        fetchWithdrawals();

        $('#transfer-to-paid').click(async () => {
            const selectedIds = [];
            $('#withdraw-history tbody input[type="checkbox"]:checked').each(function() {
                const row = $(this).closest('tr');
                const data = $('#withdraw-history').DataTable().row(row).data();
                selectedIds.push(data.id);
            });

            try {
                for (const id of selectedIds) {
                    await fetch('http://localhost:5000/api/withdrawals/status', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id, status: 'Paid' }),
                    });
                }
                alert('Selected withdrawals have been marked as Paid.');
                fetchWithdrawals(); // Refresh the data
            } catch (error) {
                console.error('Error updating withdrawal status:', error);
            }
        });

        // Cleanup function to destroy the DataTable instance on component unmount
        return () => {
            const table = $('#withdraw-history').DataTable();
            if (table) {
                table.destroy();
            }
        };
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h3>Total Balance Fund</h3>
                <p id="total-balance-fund">₹50,000.00</p>
            </div>
            <table id="withdraw-history" className="display responsive nowrap" style={styles.table}>
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
                    {/* Data will be inserted here by DataTables */}
                </tbody>
            </table>
            <button id="transfer-to-paid" style={styles.button}>Transfer to Paid</button>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(https://your-image-link.com/web_eg_02.jpg)', // Update with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black',
        margin: 0,
        padding: '20px',
    },
    box: {
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '1200px',
        margin: 'auto',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default TodayPaidWithdraw;
