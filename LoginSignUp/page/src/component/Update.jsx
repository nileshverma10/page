import React, { useState } from "react";
// import axios from "axios";
import "./AddProduct.css";
const Update = () => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  //   const [error, setError] = useState(false);

  const handleUpdate = () => {
    console.log(name, model, price, company);
  };
  return (
    <div>
      <h3 className="fname">Name</h3>
      <input
        className="finput"
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      {/* {error && !name && <span className="valid">Enter Valid Name</span>} */}
      <h3 className="fname">Model</h3>
      <input
        className="finput"
        type="text"
        placeholder="Enter Your Name"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <br />
      {/* {error && !model && <span className="valid">Enter Valid Name</span>} */}
      <h3 className="fname">Price</h3>
      <input
        className="finput"
        type="text"
        placeholder="Enter Your Name"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      {/* {error && !price && <span className="valid">Enter Valid Name</span>} */}
      <h3 className="fname">Company</h3>
      <input
        className="finput"
        type="text"
        placeholder="Enter Your Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br />
      {/* {error && !company && <span className="valid">Enter Valid Name</span>} */}
      <br />
      <button className="btn" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default Update;
