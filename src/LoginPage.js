
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import './LoginPage.css'; 

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeesRef = collection(db, 'employees');
      const q = query(employeesRef, where('EmployeeID', '==', loginData.id));
      const querySnapshot = await getDocs(q);

      let userFound = false;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.EmployeePassword === loginData.password) {
          userFound = true;
          sessionStorage.setItem('employeeID', loginData.id); 
          navigate('/home');
        }
      });

      if (!userFound) {
        alert('Incorrect ID or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <label>
            Employee ID:
            <input type="text" name="id" value={loginData.id} onChange={handleLoginChange} required className="full-width" />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required className="full-width" />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
