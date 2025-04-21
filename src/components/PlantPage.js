import { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: ""
  });

  // Fetch plants on initial render
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        setPlants([...plants, newPlant]);
        setNewPlant({ name: "", image: "", price: "" });
      });
  }

  // Handle sold out toggle
  function handleSoldOut(plantId) {
    setPlants(plants.map(plant => 
      plant.id === plantId 
        ? { ...plant, soldOut: !plant.soldOut } 
        : plant
    ));
  }

  // Filter plants based on search term
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type a name to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add New Plant Form */}
      <div className="new-plant-form">
        <h2>New Plant</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Plant name"
            value={newPlant.name}
            onChange={(e) => setNewPlant({...newPlant, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPlant.image}
            onChange={(e) => setNewPlant({...newPlant, image: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            step="0.01"
            value={newPlant.price}
            onChange={(e) => setNewPlant({...newPlant, price: e.target.value})}
          />
          <button type="submit">Add Plant</button>
        </form>
      </div>

      {/* Plant List */}
      <div className="plant-list">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="plant-item" data-testid="plant-item">
            <img src={plant.image} alt={plant.name} />
            <h4>{plant.name}</h4>
            <p>Price: {plant.price}</p>
            <button onClick={() => handleSoldOut(plant.id)}>
              {plant.soldOut ? "Out of Stock" : "In Stock"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default PlantPage;