import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios
      .get("http://localhost:5000/getProduct")
      .then((result) => {
        console.log(result.data);
        // alert("success");
        setProduct(result.data);
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });
  };
  return (
    <div className="prod-div">
      <h2>Product List</h2>
      <ul>
        <li>S.NO</li>
        <li>Model</li>
        <li>Price</li>
        <li>Company</li>
      </ul>
      {/* {product.map((item, index) => {
        return (
          <ul>
            <li>{index + 1}</li>
            <li>{item.model}</li>
            <li>{item.price}</li>
            <li>{item.company}</li>
          </ul>
        );
      })} */}
    </div>
  );
};

export default ProductList;
