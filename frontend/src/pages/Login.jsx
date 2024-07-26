import React, { useState } from 'react';
import { login } from "../services/HttpClient";

export const Login = () => {
    const [email, setEmail] = useState("stefan@mail.com");
    const [password, setPassword] = useState("1234");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await login(email, password);
          localStorage.setItem("token", response.token);
          window.alert("You are now logged in.");
          window.location.href = "/sendtransaction";
        } catch (error) {
          console.error(error);
          window.alert("There was an error while logging in, please try again.");
        }
      };

  return (
    <div className="login-wrapper">
      <h1>Log in</h1>
      <form className="forms" onSubmit={handleSubmit}>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}
