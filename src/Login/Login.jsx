import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

    // Simulate successful login
    alert('Login successful!');
    
    // Example fetch to send form data to the server
    /*
    fetch('/login-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(response => {
      if (response.ok) {
        alert('Login successful!');
        window.location.href = '/admin-dashboard';
      } else {
        alert('Login failed!');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('Login failed!');
    });
    */
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      backgroundSize: 'cover',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'url("https://cdn.pixabay.com/photo/2017/08/30/01/05/bitcoin-2697950_960_720.jpg") no-repeat center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      opacity: 0.1,
      zIndex: -1,
    },
    loginContainer: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      maxWidth: '400px',
    },
    loginBox: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
    },
    loginHeader: {
      margin: 0,
    },
    h2: {
      margin: 0,
      fontSize: '2rem',
      marginBottom: '15px',
    },
    p: {
      margin: 0,
      fontSize: '1rem',
      color: '#ccc',
    },
    loginForm: {
      marginTop: '25px',
    },
    inputGroup: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '0.875rem',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '5px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
    },
    placeholder: {
      color: '#ccc',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '5px',
      background: '#27ae60',
      color: '#fff',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      background: '#2ecc71',
    },
    forgotPassword: {
      display: 'block',
      marginTop: '15px',
      fontSize: '0.875rem',
      color: '#3498db',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    forgotPasswordHover: {
      color: '#2980b9',
    },
    '@media (max-width: 768px)': {
      h2: {
        fontSize: '1.5rem',
      },
      p: {
        fontSize: '0.875rem',
      },
      label: {
        fontSize: '0.75rem',
      },
      input: {
        fontSize: '0.875rem',
      },
      button: {
        fontSize: '0.875rem',
      },
      forgotPassword: {
        fontSize: '0.75rem',
      },
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.before}></div>
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <div style={styles.loginHeader}>
            <h2 style={styles.h2}>Admin Panel</h2>
            <p style={styles.p}>Login to your crypto staking admin panel</p>
          </div>
          <form style={styles.loginForm} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="Enter your username"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" style={styles.button}>Login</button>
            <a href="#" style={styles.forgotPassword}>Forgot Password?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
