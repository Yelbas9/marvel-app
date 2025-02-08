import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";

const BASE_URL = import.meta.env.VITE_API_URL;

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
      await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError("Erreur lors de l'inscription !");
      console.error("Erreur d'inscription :", error);
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
