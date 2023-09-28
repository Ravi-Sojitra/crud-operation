import React, { useEffect, useState } from "react";
import Modal from "./Modal";
function AddDataForm() {
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("records")) || []
  );
  console.log("data", records);
  useEffect(() => {}, []);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
    id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("name====>", name, "value=====>", value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const clickToAddData = (e) => {
    e.preventDefault();
    const { firstName, lastName, city, phone, id } = userData;
    const record = {
      id: id || Date.now(),
      firstName,
      lastName,
      city,
      phone,
    };
    // console.log("record***", record);
    const existingRecordIndex = records.findIndex((r) => r.id == id);
    // console.log("existingRecordIndex", existingRecordIndex);
    // console.log("existingRecordIndex !== -1", existingRecordIndex !== -1);
    if (existingRecordIndex !== -1) {
      // setRecords()
      // records[existingRecordIndex] = record;
    } else {
      setRecords([...records, record]);
      // records.push(record);
    }
    const data = [...records, record];
    console.log("tushar", data);
    localStorage.setItem("records", JSON.stringify(data));
  };
  function clickToUpdateRecord(user) {
    const updatedRecords = records.map((record) => {
      if (record.id === user.id) {
        return {
          ...record,
          firstName: userData.firstName,
          lastName: userData.lastName,
          city: userData.city,
          phone: userData.phone,
        };
      }
      return record;
    });
    setRecords(updatedRecords);
    // Store the updated array in localStorage
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    closeModal()
  }
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const editRecord = (obj) => {
    console.log("-=-=-=-  object", obj);
    setUserData(obj);
    openModal();
    // const record = records.find((r) => r.id === id);
    // if (record) {
    //   setUserData({
    //     firstName: record.firstName,
    //     lastName: record.lastName,
    //     city: record.city,
    //     phone: record.phone,
    //     id: record.id,
    //   });
    // }
  };
  const deleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
    setRecords(updatedRecords);
  };
  // console.log("userData==>", userData);
  return (
    <div>
      <form action="">
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
        <div>
          <button onClick={clickToAddData}>SUBMIT</button>
        </div>
      </form>
      <br />
      {records.map((user, index) => {
        return (
          <div key={index}>
            <div
              style={{
                backgroundColor: "ActiveCaption",
                padding: "2px",
                color: "white",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div> {user.firstName}</div>
              <div> {user.lastName}</div>
              <div> {user.city}</div>
              <div> {user.phone}</div>
              <div>
                {" "}
                <button onClick={() => editRecord(user)}>Edit</button>
              </div>
              <button onClick={() => deleteRecord(user.id)}>Delete</button>
            </div>
          </div>
        );
      })}
      {showModal && (
        <div>
          <Modal
            userData={userData}
            setUserData={setUserData}
            showModal={showModal}
            closeModal={closeModal}
            setShowModal={setShowModal}
            clickToUpdateRecord={clickToUpdateRecord}
          />
        </div>
      )}
    </div>
  );
}
export default AddDataForm;