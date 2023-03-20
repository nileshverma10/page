import axios from "axios";
import React, { useState, useEffect} from "react";
import "./TTable.css";

const Home = () => {
  const [data1, setData] = useState([]);
  useEffect(() => {
    axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
  return (
    <div>
         <>
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
          <td className="head"></td>
        </tr>
      </tbody>
    </>
    </div>
  )
}

export default Home