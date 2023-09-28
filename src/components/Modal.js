import React, { useState } from 'react';
import './modal.css'
const Modal = (props) => {
  const {clickToUpdateRecord , userData  ,closeModal  , setUserData}= props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("name====>", name, "value=====>", value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <div>
        <div className="modal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close">X</button>
              </div>
              <div className="modal-body">
              <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select
            name="city"
            required
            value={userData.city}
            onChange={handleChange}
          >
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            {/* Add more cities as needed */}
          </select>
          <br />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            required
            value={userData.phone}
            onChange={handleChange}
          />
          <br />
        </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={()=>clickToUpdateRecord(userData)}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default Modal;