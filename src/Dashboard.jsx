import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import fctcLogo from './fctc.png'; // Adjust the path according to your file structure

const Dashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={fctcLogo} alt="Fctctoken Logo" className="logo-image" />
          <div className="logo-text">
            <i className="fas fa-bullseye"></i> FCTCTOKEN
          </div>
        </div>
        <ul>
          <li className="dropdown">
            <Link to="/dashboard"><i className="fas fa-users"></i> Dashboard <i className="fas fa-caret-down"></i></Link>
          </li>
          <li className="dropdown">
            <a href="#" onClick={() => handleDropdownClick('deposits')}>
              <i className="fas fa-piggy-bank"></i> Deposits <i className="fas fa-caret-down"></i>
            </a>
            <ul className={`dropdown-menu ${activeDropdown === 'deposits' ? 'active' : ''}`}>
              <li><Link to="/deposit-request"><i className="fas fa-file-alt"></i> Deposit Request</Link></li>
              <li><Link to="/today-deposit"><i className="fas fa-calendar-day"></i> Today’s Deposits</Link></li>
              <li><Link to="/deposit-history"><i className="fas fa-history"></i> Deposit History</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" onClick={() => handleDropdownClick('withdrawals')}>
              <i className="fas fa-hand-holding-usd"></i> Withdrawals <i className="fas fa-caret-down"></i>
            </a>
            <ul className={`dropdown-menu ${activeDropdown === 'withdrawals' ? 'active' : ''}`}>
              <li><Link to="/withdraw-request"><i className="fas fa-file-alt"></i> Request Withdrawal</Link></li>
              <li><Link to="/rejected-withdrawals"><i className="fas fa-ban"></i> Rejected Withdrawals</Link></li>
              <li><Link to="/withdraw-history"><i className="fas fa-history"></i> Withdrawal History</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#"><i className="fas fa-users"></i> Community <i className="fas fa-caret-down"></i></a>
            <ul className="dropdown-menu">
              <li><Link to="/community"><i className="fas fa-user-friends"></i> Active Members/Inactive Members</Link></li>
            </ul>
          </li>
          <li><Link to="/news"><i className="fas fa-newspaper"></i> News</Link></li>
          <li className="dropdown">
            <a href="#" onClick={() => handleDropdownClick('settings')}>
              <i className="fas fa-cogs"></i> Settings <i className="fas fa-caret-down"></i>
            </a>
            <ul className={`dropdown-menu ${activeDropdown === 'settings' ? 'active' : ''}`}>
              <li><Link to="/admin-password"><i className="fas fa-key"></i> Change Admin Password</Link></li>
              <li><Link to="/member-password"><i className="fas fa-user-shield"></i> Change Member Password</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/wallet-changes"><i className="fas fa-users"></i> Wallet Address or Change Request <i className="fas fa-caret-down"></i></Link>
          </li>
          <li className="dropdown">
            <a href="#" onClick={() => handleDropdownClick('fundManagement')}>
              <i className="fas fa-money-bill-wave"></i> Fund Management <i className="fas fa-caret-down"></i>
            </a>
            <ul className={`dropdown-menu ${activeDropdown === 'fundManagement' ? 'active' : ''}`}>
              <li><Link to="/add-fund"><i className="fas fa-plus-circle"></i> Add Fund</Link></li>
              <li><Link to="/fund-history"><i className="fas fa-history"></i> Fund History</Link></li>
            </ul>
          </li>
          <li><Link to="/login"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <header>
          <div className="breadcrumb">
            <a href="/">Home</a> <span>Dashboard</span>
          </div>
        </header>
        <section className="dashboard-cards">
          <Link to="/total-users" className="card">
            <h3><i className="fas fa-users"></i> Total Users</h3>
            <p>0</p>
          </Link>
          <Link to="/total-registration-today" className="card">
            <h3><i className="fas fa-user-plus"></i> Total Registration Today</h3>
            <p>0</p>
          </Link>
          <Link to="/total-active-members" className="card">
            <h3><i className="fas fa-user-check"></i> Total Active Member</h3>
            <p>0</p>
          </Link>
          <Link to="/total-inactive-members" className="card">
            <h3><i className="fas fa-user-times"></i> Total Inactive Member</h3>
            <p>0</p>
          </Link>
          <Link to="/total-withdraw-fund" className="card">
            <h3><i className="fas fa-hand-holding-usd"></i> Total Withdrawal Fund</h3>
            <p>0.00</p>
          </Link>
          <Link to="/today-withdraw" className="card">
            <h3><i className="fas fa-exchange-alt"></i> Today Withdrawal Requests</h3>
            <p>0 - ₹ 0.00</p>
          </Link>
          <Link to="/today-paid-withdraw" className="card">
            <h3><i className="fas fa-coins"></i> Today Paid Withdrawal</h3>
            <p>0 - ₹ 0.00</p>
          </Link>
          <Link to="/today-unpaid-withdraw" className="card">
            <h3><i className="fas fa-times-circle"></i> Today Unpaid Withdrawal</h3>
            <p>0 - ₹ 0.00</p>
          </Link>
          <Link to="/total-add-fund-admin" className="card">
            <h3><i className="fas fa-plus-circle"></i> Total Add Fund ADMIN</h3>
            <p>0.00</p>
          </Link>
          <Link to="/today-add-fund-admin" className="card">
            <h3><i className="fas fa-piggy-bank"></i> Today Add Fund ADMIN</h3>
            <p>0 - ₹ 0.00</p>
          </Link>
          <Link to="/total-withdraw" className="card">
            <h3><i className="fas fa-coins"></i> Total Withdrawal Fund</h3>
            <p>0.0000</p>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
