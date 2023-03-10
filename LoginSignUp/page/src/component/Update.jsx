import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import "./AddProduct.css";

const Update = () => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductAndUpdate();
  }, []);

  const getProductAndUpdate = async () => {
    console.log(params);
    let result = await fetch(
      `http://localhost:5000/getProductDetail/${params.id}`
    );
    result = await result.json();
    console.log(result);
    setName(result.data.name);
    setModel(result.data.model);
    setPrice(result.data.price);
    setCompany(result.data.company);
  };

  const handleUpdate = async () => {
    console.log(name, model, price, company);
    let result = await fetch(
      `http://localhost:5000/updateProduct/${params.id}`,
      {
        method: "put",
        body: JSON.stringify({ name, model, price, company }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    navigate("/productlist");
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
