
import "./App.css";
import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "", 
  });

 const [serverResponse, setServerResponse] = useState({ message: "" }); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/your-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setServerResponse(data); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="box1">AyurvedaAI</div>
        <div className="box2">What do you need help with?</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="box3"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <button className= "round-button" type="submit">Ask Question</button>
        </form>
        <div className="server-response">{serverResponse.message}</div>
      </div>
    </div>
  );
}

export default App;

