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
          window.location.href = "/";
        } catch (error) {
          console.error(error);
          window.alert("There was an error while logging in, please try again.");
        }
      };

  return (
    <div className="login-wrapper">
      <h1>Log in</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}
