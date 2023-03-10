import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("success");
    if (auth) {
      navigate("/");
    }
  });

  const getInitialState = () => {
    const value = "male, female,other";
    return value;
  };
  const [gender, setGender] = useState(getInitialState);

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  console.log({
    email,
    password,
    fname,
    lname,
    number,
    confirmPassword,
    gender,
  });

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword1 = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleFname = (e) => {
    setFname(e.target.value);
  };

  const handleApi = () => {
    console.log({ email, password, fname, lname, number, gender });

    axios
      .post("http://localhost:5000/register", {
        email: email,
        password: password,
        fname: fname,
        lname: lname,
        phone: number,
        gender: gender,
      })
      .then((result) => {
        console.log(result.data);
        alert("success");
        if (result.data) {
          localStorage.setItem("success", JSON.stringify(result.data));
          navigate("/");
        }
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });

    axios
      .get("http://localhost:5000/getData")
      .then((result) => {
        console.log(result.data);
        // alert("success");
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });

    // axios
    //   .delete("http://localhost:5000/deleteData")
    //   .then((result) => {
    //     console.log(result.data);
    //     // alert("success");
    //   })
    //   .catch((error) => {
    //     // alert("service error");
    //     console.log(error);
    //   });

    // axios
    //   .patch("http://localhost:5000/patchData")
    //   .then((result) => {
    //     console.log(result.data);
    //     // alert("success");
    //   })
    //   .catch((error) => {
    //     // alert("service error");
    //     console.log(error);
    //   });
  };

  return (
    <div className="App">
      <h3 className="fname">First Name</h3>
      <input
        className="finput"
        value={fname}
        type="text"
        placeholder="Enter your first name"
        onChange={handleFname}
      />
      <br />
      <h3>Last Name</h3>
      <input
        className="linput"
        value={lname}
        type="text"
        placeholder="Enter your Last name"
        onChange={(e) => setLname(e.target.value)}
      />
      <br />
      <h3>Gender</h3>
      <select className="genselect" value={gender} onChange={handleChange}>
        <option>Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />
      <h3>Contact Number</h3>
      <input
        className="linput"
        type="text"
        value={number}
        placeholder="Enter your Number"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <br />
      <h3>Email</h3>
      <input
        className="email"
        value={email}
        onChange={handleEmail}
        type="text"
        placeholder="Enter your Email"
      />
      <br />
      <h3>Password </h3>
      <input
        className="pass"
        value={password}
        onChange={handlePassword}
        type="text"
        placeholder="Enter your Password"
      />
      <br />
      <h3> Confirm Password </h3>
      <input
        className="pass"
        value={confirmPassword}
        onChange={handlePassword1}
        type="text"
        placeholder="Enter your Confirm Password"
      />
      <br />
      <button className="btn" onClick={handleApi}>
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
