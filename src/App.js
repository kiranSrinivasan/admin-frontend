import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Community from './Community/Community';
import TodayAddFundAdmin from './Dashboard/TodayAddFundAdmin';
import TodayPaidWithdraw from './Dashboard/TodayPaidWithdraw';
import TodayUnpaidWithdraw from './Dashboard/TodayUnpaidWithdraw';
import TodayWithdraw from './Dashboard/TodayWithdraw';
import TotalActiveMembers from './Dashboard/TotalActiveMembers';
import TotalAddFundAdmin from './Dashboard/TotalAddFundAdmin';
import TotalBalance from './Dashboard/TotalBalance';
import TotalInActiveMember from './Dashboard/TotalInActiveMember';
import TotalRegistrationToday from './Dashboard/TotalRegistrationToday';
import TotalUsers from './Dashboard/TotalUsers';
import TotalWithdraw from './Dashboard/TotalWithdraw';
import TotalWithdrawFund from './Dashboard/TotalWithdrawFund';
import DepositHistory from './Deposit/DepositHistory';
import DepositRequest from './Deposit/DepositRequest';
import TodayDeposit from './Deposit/TodayDeposit';
import Login from './Login/Login';
import News from './News/News';
import AddFrontBanner from './settings/AddFrontBanner';
import AdminPassword from './settings/AdminPassword';
import MemberPassword from './settings/MemberPassword';
import Reject from './Withdraw/Reject';
import Request from './Withdraw/Request';
import WithdrawHistory from './Withdraw/WithdrawHistory';
import Wallet from './Wallet';  // Import Wallet component

function App() {
  const isLoggedIn = true; // Replace with your actual login state logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/today-add-fund-admin" element={<TodayAddFundAdmin />} />
        <Route path="/today-paid-withdraw" element={<TodayPaidWithdraw />} />
        <Route path="/today-unpaid-withdraw" element={<TodayUnpaidWithdraw />} />
        <Route path="/today-withdraw" element={<TodayWithdraw />} />
        <Route path="/total-active-members" element={<TotalActiveMembers />} />
        <Route path="/total-add-fund-admin" element={<TotalAddFundAdmin />} />
        <Route path="/total-balance" element={<TotalBalance />} />
        <Route path="/total-inactive-members" element={<TotalInActiveMember />} />
        <Route path="/total-registration-today" element={<TotalRegistrationToday />} />
        <Route path="/total-users" element={<TotalUsers />} />
        <Route path="/total-withdraw" element={<TotalWithdraw />} />
        <Route path="/total-withdraw-fund" element={<TotalWithdrawFund />} />
        <Route path="/deposit-history" element={<DepositHistory />} />
        <Route path="/deposit-request" element={<DepositRequest />} />
        <Route path="/today-deposit" element={<TodayDeposit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News />} />
        <Route path="/add-front-banner" element={<AddFrontBanner />} />
        <Route path="/admin-password" element={<AdminPassword />} />
        <Route path="/member-password" element={<MemberPassword />} />
        <Route path="/rejected-withdrawals" element={<Reject />} />
        <Route path="/withdraw-request" element={<Request />} />
        <Route path="/withdraw-history" element={<WithdrawHistory />} />
        <Route path="/wallet-changes" element={<Wallet />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
