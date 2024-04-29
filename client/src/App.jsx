import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const dashboard = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => dashboard("/dashboard"));
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:3000/login", {
        email: inputs.email,
        password: inputs.password
    }).catch((e) => console.log(e));
    const dataa = await res.data;
    console.log(dataa);
    return dataa;
  }

  return (
    <h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={inputs.email}
          type="email"
          name="email"
          placeholder="username"
        />
        <input
          onChange={handleChange}
          value={inputs.password}
          type="password"
          name="password"
          placeholder="password"
        />
        <input type="submit" />
      </form>
    </h1>
  );
}

export default App;
