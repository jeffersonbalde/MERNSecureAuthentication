import React, { useState } from "react";

function SignUp() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputs.name} type="text" name="name" placeholder="name" />
        <input onChange={handleChange} value={inputs.email} type="email" name="username" placeholder="username" />
        <input onChange={handleChange} value={inputs.password} type="password" name="name" placeholder="name" />
      </form>
    </div>
  );
}

export default SignUp;
