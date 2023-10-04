import React, { useState, useEffect } from 'react';

function EditForm({ data, onUpdate }) {
  const [formData, setFormData] = useState({ ...data });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the data in the parent component via a callback function
    onUpdate(formData);
  };

  return (
    <div>
      <h1>Edit Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {/* Other form fields */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

function App() {
  const [dataArray, setDataArray] = useState([
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Alice', email: 'alice@example.com' },
    // More data items
  ]);

  const updateDataItem = (updatedItem) => {
    // Find and update the item in the dataArray
    const updatedArray = dataArray.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setDataArray(updatedArray);
  };

  return (
    <div>
      <h1>Data Editing App</h1>
      <ul>
        {dataArray.map((item) => (
          <li key={item.id}>
            {item.name} ({item.email}){' '}
            <button
              onClick={() => {
                // Open the edit form for the selected item
                // Pass the item's data and the update function to the form component
                // You can also use a state variable to control whether the form is displayed or not
                console.log('Edit button clicked for ID:', item.id);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {/* Display the edit form */}
      
    </div>
  );
}

export default App;
