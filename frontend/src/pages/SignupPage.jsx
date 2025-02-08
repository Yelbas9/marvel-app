import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }
    try {
      await axios.post("http://localhost:4000/auth/signup", {
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError("Erreur lors de l'inscription !");
    }
  };

  return (
    <AuthForm
      title="S'inscrire"
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleSubmit={handleSignup}
      error={error}
      showConfirmPassword={true}
    />
  );
};

export default SignupPage;
