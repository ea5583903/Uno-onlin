import React, { useState } from 'react';
import './App.css';

const BANK_NAME = "First National Bank";

function PinSetupForm({ onPinCreate, onCancel }) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === confirmPin && pin.length === 4) {
      onPinCreate(pin);
    } else {
      alert('PINs must match and be 4 digits!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Your EZ Sign In PIN</h3>
      <input
        type="password"
        maxLength="4"
        pattern="[0-9]*"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter 4-digit PIN"
        required
      />
      <input
        type="password"
        maxLength="4"
        pattern="[0-9]*"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
        placeholder="Confirm PIN"
        required
      />
      <button type="submit">Create PIN</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

function HomeMenu({ onSignOut, user }) {
  const [showPinSetup, setShowPinSetup] = useState(false);

  return (
    <div className="home-menu">
      <h2>Welcome to {BANK_NAME} Dashboard</h2>
      <div className="menu-buttons">
        <button onClick={onSignOut}>Sign Out</button>
        <button onClick={() => setShowPinSetup(true)}>Ez Sign In</button>
        <button onClick={() => window.location.href = "https://docs.google.com/presentation/d/1HqAeaSk8E9q3vebJZ5CpyTpF_QKosr8SYF1J10eOJTg/edit#slide=id.g2a48a0d9b6d_0_578"}>
          About us
        </button>
        <button onClick={() => {
          const ownerPin = prompt('Enter Owner PIN:');
          if (ownerPin === '2234') {
            alert('Owner Edit Mode Activated');
          } else {
            alert('Incorrect PIN');
          }
        }}>
          Owner Edit Mode
        </button>
        <button onClick={() => {
          const ownerPin = prompt('Enter Owner PIN:');
          if (ownerPin === '2234') {
            alert('Owner Menu Activated');
          } else {
            alert('Incorrect PIN');
          }
        }}>
          Owner Menu
        </button>
        <button onClick={() => {
          const userInfo = `Name: ${user.name}\nage: ${user.age}\nCode: ${user.code}`;
          alert(userInfo);
        }}>
          Your Account
        </button>
      </div>
      {showPinSetup && (
        <PinSetupForm
          onPinCreate={(pin) => {
            localStorage.setItem('ezSignInPin', pin);
            setShowPinSetup(false);
            alert('PIN created successfully!');
          }}
          onCancel={() => setShowPinSetup(false)}
        />
      )}
    </div>
  );
}

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [color, setColor] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSignOut = () => {
    // Reset all states
    setName('');
    setAge('');
    setColor('');
    setSubmitted(false);
    setShowHome(false);
    setShowCodeInput(false);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    // Validate the code
    if (code !== '2234') { // Updated the valid code to '2234'
      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 10000); // Lock for 10 seconds
      return;
    }
    console.log('Code submitted:', code);
    setShowHome(true);
    setShowCodeInput(false);
  };

  return (
    <div className="App">
      <div className="logo" style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <h1>💰 {BANK_NAME}</h1>
      </div>
      <button
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        onClick={() => setShowCodeInput(true)}
      >
        Admin Login
      </button>
      <header className="App-header">
        {showCodeInput ? (
          <form onSubmit={handleCodeSubmit}>
            <div>
              <label>
                Enter your code:
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  disabled={isLocked}
                />
              </label>
              <lable>
                First letter caps, no spaces
              </lable>
            </div>
            <button type="submit" disabled={isLocked}>Submit Code</button>
            {isLocked && <p>Please wait 10 seconds before trying again.</p>}
          </form>
        ) : showHome ? (
          <HomeMenu onSignOut={handleSignOut} user={{name, age, code}}/>
        ) : !submitted ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                What's your name?
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                How old are you?
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                What's your favorite color?
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                />
              </label>
             
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <h2>Nice to meet you!</h2>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Favorite Color: {color}</p>
            <button onClick={() => setShowHome(true)}>Continue to Home</button>
            <button onClick={() => setSubmitted(false)}>Edit Information</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
