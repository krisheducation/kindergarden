import React, { useState, useEffect } from "react";
import axios from "axios";

const shapes = ["Circle", "Square", "Triangle", "Rectangle", "Star"];
const colors = ["Red", "Blue", "Green", "Yellow", "Purple"];

function App() {
  const [selectedShape, setSelectedShape] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/selection").then((res) => {
      setSelectedShape(res.data.shape);
      setSelectedColor(res.data.color);
    });
  }, []);

  const updateSelection = () => {
    axios.post("http://localhost:5000/update", {
      shape: selectedShape,
      color: selectedColor,
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select Shape and Color</h2>

      <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)}>
        {shapes.map((shape) => (
          <option key={shape} value={shape}>{shape}</option>
        ))}
      </select>

      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
        {colors.map((color) => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>

      <button onClick={updateSelection}>Update</button>

      <div style={{
        width: "100px",
        height: "100px",
        backgroundColor: selectedColor,
        margin: "20px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: selectedShape === "Circle" ? "50%" : "0",
        clipPath: selectedShape === "Triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
      }}>
        {selectedShape}
      </div>
    </div>
  );
}

export default App;
