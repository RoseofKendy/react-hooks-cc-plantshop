import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  const price = typeof plant.price === 'string' 
    ? parseFloat(plant.price) 
    : plant.price;
  
  return (
    <div 
      className={`plant-card ${plant.soldOut ? 'sold-out' : ''}`}
      data-testid="plant-item"
    >
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${typeof plant.price === 'number' ? plant.price.toFixed(2) : plant.price}</p>
      <button 
        onClick={() => onToggleSoldOut(plant.id)}
        className={plant.soldOut ? 'primary' : ''}
      >
        {plant.soldOut ? 'In Stock' : 'Sold Out'}
      </button>
    </div>
  );
}

export default PlantCard;