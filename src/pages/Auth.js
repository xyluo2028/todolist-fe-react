import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Auth() {
  const [mode, setMode] = useState('login');

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            mode === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${
            mode === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>

      {mode === 'login' ? <Login /> : <Register />}
    </div>
  );
}