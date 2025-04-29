// src/pages/Login.jsx
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login logic for now
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/home');
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <span className="p-float-label">
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="email">Email</label>
        </span>

        <span className="p-float-label">
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
          <label htmlFor="password">Password</label>
        </span>

        <Button label="Login" icon="pi pi-sign-in" type="submit" />
      </form>

      <p className="mt-4">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
