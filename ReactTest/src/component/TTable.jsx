import axios from "axios";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./TTable.css";
function TTable() {
  // const data = localStorage.getItem("token" );
  
  const [data1, setData] = useState([]);
  //  const [response, setResponse] = useState(false)

 
  // useEffect(() => {
    const APicall = () =>{
      axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        console.log(res.data);
        // setResponse(true)
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  
  // }, []);
 
  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
        <th className="head">S.NO</th>
          <th className="head">Post ID</th>
          <th className="head">ID</th>
          <th className="head">name</th>
          <th className="head">email</th>
        </tr>
      </thead>
      <tbody>
        {data1.map((event, index) => {
          return (
            <tr key={index}>
              <td className="head">{index+1}</td>
              <td className="head">{event.postId}</td>
              <td className="head">{event.id}</td>
              <td className="head">{event.name}</td>
              <td className="head">{event.email}</td>
            </tr>
          );
        })}
        <tr>
          <td className="head"></td>
          <td className="head"></td>
          <td className="head"></td>
          <td className="head"></td>
        </tr>
      </tbody>
    </Table>
    <button  onClick={APicall}>Click Me</button>
    </>
  );
}

export default TTable;
