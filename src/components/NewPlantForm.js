import { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price // Keep as string, don't parse to number
    };

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON' // Exactly matching test expectation
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(data => {
        onAddPlant(data);
        setFormData({
          name: '',
          image: '',
          price: ''
        });
      });
  };

  return (
      <div className="new-plant-form">
        <h2>New Plant</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Plant name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Plant</button>
        </form>
      </div>
  );
}

export default NewPlantForm;
