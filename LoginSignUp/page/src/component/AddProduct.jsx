import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = (e) => {
    if (!name || !model || !price || !company) {
      setError(true);
      return false;
    }
    console.log(name, model, price, company);
    // localStorage.setItem("success", JSON.stringify());
    e.preventDefault();
    axios
      .post("http://localhost:5000/addProduct", {
        name: name,
        model: model,
        price: price,
        company: company,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("success", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
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
      {error && !name && <span className="valid">Enter Valid Name</span>}
      <h3 className="fname">Model</h3>
      <input
        className="finput"
        type="text"
        placeholder="Enter Your Name"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <br />
      {error && !model && <span className="valid">Enter Valid Name</span>}
      <h3 className="fname">Price</h3>
      <input
        className="finput"
        type="text"
        placeholder="Enter Your Name"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      {error && !price && <span className="valid">Enter Valid Name</span>}
      <h3 className="fname">Company</h3>
      <input
        className="finput"
        type="text"
        placeholder="Enter Your Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br />
      {error && !company && <span className="valid">Enter Valid Name</span>}
      <br />
      <button className="btn" onClick={handleAdd}>
        AddProduct
      </button>
    </div>
  );
};

export default AddProduct;
