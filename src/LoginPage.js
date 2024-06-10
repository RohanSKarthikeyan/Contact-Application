import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import './LoginPage.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [newUserData, setNewUserData] = useState({
    name: '',
    role: '',
    id: '',
    department: '',
    age: '',
    address: '',
    mobile: '',
    password: '',
  });
  const [newUserPassword, setNewUserPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleNewUserPasswordChange = (e) => {
    setNewUserPassword(e.target.value);
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

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeesRef = collection(db, 'employees');
      const q = query(employeesRef, where('EmployeeID', '==', newUserData.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('User already exists. Please log in.');
      } else {
        await addDoc(employeesRef, {
          EmployeeName: newUserData.name,
          EmployeeRole: newUserData.role,
          EmployeeID: newUserData.id,
          EmployeeDepartment: newUserData.department,
          EmployeeAge: newUserData.age,
          EmployeeAddress: newUserData.address,
          EmployeeMobile: newUserData.mobile,
          EmployeePassword: newUserPassword,
        });
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during registration:', error);
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

      <div className="form-box">
        <h2>New User Registration</h2>
        <form onSubmit={handleNewUserSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={newUserData.name} onChange={handleNewUserChange} required />
          </label>
          <label>
            Role:
            <input type="text" name="role" value={newUserData.role} onChange={handleNewUserChange} required />
          </label>
          <label>
            Employee ID:
            <input type="text" name="id" value={newUserData.id} onChange={handleNewUserChange} required />
          </label>
          <label>
            Department:
            <input type="text" name="department" value={newUserData.department} onChange={handleNewUserChange} required />
          </label>
          <label>
            Age:
            <input type="text" name="age" value={newUserData.age} onChange={handleNewUserChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={newUserData.address} onChange={handleNewUserChange} required />
          </label>
          <label>
            Mobile:
            <input type="text" name="mobile" value={newUserData.mobile} onChange={handleNewUserChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={newUserPassword} onChange={handleNewUserPasswordChange} required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
