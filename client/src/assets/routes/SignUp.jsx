import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const login = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:3000/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
    }).catch((e) => console.log(e));
    const dataa = await res.data;
    return dataa;
  }

//   const sendRequest = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/signup", {
//         name: inputs.name,
//         email: inputs.email,
//         password: inputs.password
//       });
//       const dataa = res.data; // No need for await here
//       return dataa;
//     } catch (error) {
//       console.log(error.message); // Log the error message
//       // You might want to throw the error here or handle it differently based on your requirements
//     }
//   };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => login("/"));
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputs.name} type="text" name="name" placeholder="name" />
        <input onChange={handleChange} value={inputs.email} type="email" name="email" placeholder="username" />
        <input onChange={handleChange} value={inputs.password} type="password" name="password" placeholder="password" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SignUp;
