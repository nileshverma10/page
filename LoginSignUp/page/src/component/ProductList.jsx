import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState({});
  const [item, setItem] = useState([]);

  useEffect(() => {
    getList();
    // console.log(item);
  }, []);

  const getList = () => {
    axios
      .get("http://localhost:5000/getProduct")
      .then((result) => {
        console.log(result.data);
        // alert("success");
        setProduct(result.data);
        // console.log("AQSQSQSQSQSQS ===", result.data.data);
        setItem(result.data.data);
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });
  };
  const DeleteList = (id) => {
    console.warn(id);
    axios
      .delete(`http://localhost:5000/deleteList/${id}`)
      .then((result) => {
        console.log(result.data);
        getList();
        // alert("success");
      })
      .catch((error) => {
        // alert("service error");
        console.log(error);
      });
  };
  return (
    <div className="prod-div">
      <h2>Product List</h2>
      <ul>
        <li>S.NO</li>
        <li>Name</li>
        <li>Model</li>
        <li>Price</li>
        <li>Company</li>
        <li>Delete/Update</li>
      </ul>
      {item.map((d, index) => (
        <ul key={index}>
          <li>{index + 1}</li>
          <li>{d.name}</li>
          <li>{d.model}</li>
          <li>{d.price}</li>
          <li>{d.company}</li>
          <li>
            <button onClick={() => DeleteList(d._id)}>Delete</button>
            <Link to={"/update/" + d._id}>Update</Link>
          </li>
        </ul>
      ))}
      {/* <ul>
        <li> {item.index + 1}</li>
        <li>{item.name}</li>
        <li> {item.model}</li>
        <li> {item.price}</li>
        <li> {item.company}</li>
      </ul> */}
    </div>
  );
};

export default ProductList;
