// AllEmployees.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getSessionData = () => {
       
  
      const userData = sessionStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    };

    const data = getSessionData();
    setUserData(data);

  }, []);


  useEffect(() => {
    async function getEmployees() {
      try {
        const response = await axios.get('http://localhost:4000/employee/alle');
        setEmployees(response.data);
      } catch (error) {
        alert(error.message);
      }
    }
    getEmployees();
  }, []);

  const getRoleFromId = (eid) => {
    const firstChar = eid.charAt(0).toUpperCase();
    switch (firstChar) {
      case 'E':
        return 'Worker';
      case 'R':
        return 'Receptionist';
      case 'A':
        return 'Admin';
      case 'S':
        return 'Surf Trainer';
      default:
        return '';
    }
  };

  const handleMouseEnter = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleMouseLeave = () => {
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.eid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getRoleFromId(employee.eid).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: 'blue', marginBottom: '20px' }}>All Employees</h1>
      <input
        type="text"
        placeholder="Search by name, ID, or role"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
      />
    <div>
    {userData && userData.status !== "Ref" && (   
    <>
      <Link className="btn btn-success mb-4" to="/staff/add"> Add Employee</Link>
    
      </>
      )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '20px', justifyContent: 'center' }}>
        {filteredEmployees.map((employee, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              width: '250px',
            }}
            onMouseEnter={() => handleMouseEnter(employee)}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{ width: '200px', height: '200px', overflow: 'hidden', margin: '0 auto 15px', borderRadius: '50%' }}>
              {employee.imageData && <img src={`data:${employee.imageContentType};base64,${employee.imageData}`} alt="Employee" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />}
            </div>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Employee ID: {employee.eid}</p>
            <p>Name: {employee.name}</p>
            <p>Age: {employee.age}</p>
            <p>Address: {employee.address}</p>
            <p>Gender: {employee.gender}</p>
            <p>Email: {employee.email}</p>
            <p>Contact No: {employee.contactno}</p>
            <p>Role: {getRoleFromId(employee.eid)}</p> {/* Display role */}
            {selectedEmployee === employee && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: '999',
                }}
              >
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Employee ID: {employee.eid}</p>
                  <p>Name: {employee.name}</p>
                  <p>Age: {employee.age}</p>
                  <p>Address: {employee.address}</p>
                  <p>Gender: {employee.gender}</p>
                  <p>Email: {employee.email}</p>
                  <p>Contact No: {employee.contactno}</p>
                  <p>Role: {getRoleFromId(employee.eid)}</p> {/* Display role */}
                  
                  <div>
                  {userData && userData.status !== "Ref" && (   
                  <>

                  <Link className='btn btn-primary me-2' to={`/staff/update/${employee.eid}`}>Edit</Link>
                  <Link className='btn btn-danger' to={`/staff/delete/${employee.eid}`}>Delete</Link>

                </>
                )}
                </div>

                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
