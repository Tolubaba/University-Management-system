import React, { useReducer } from 'react';

const initialState = {
  dataArray: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Alice', email: 'alice@example.com' },
  ],
  editingItemId: null, 
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_EDIT':
      return { ...state, editingItemId: action.payload };
    case 'UPDATE_ITEM':
      const updatedArray = state.dataArray.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return { ...state, dataArray: updatedArray, editingItemId: null };
    default:
      return state;
  }
}

function EditForm({ data, onUpdate }) {
  const [formData, setFormData] = React.useState({ ...data });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateDataItem = (updatedItem) => {
    dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
  };

  return (
    <div>
      <h1>Data Editing App</h1>
      <ul>
        {state.dataArray.map((item) => (
          <li key={item.id}>
            {item.name} ({item.email}){' '}
            <button onClick={() => dispatch({ type: 'START_EDIT', payload: item.id })}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      {state.editingItemId !== null && (
        <EditForm
          data={state.dataArray.find((item) => item.id === state.editingItemId)}
          onUpdate={updateDataItem}
        />
      )}
    </div>
  );
}

export default App;
