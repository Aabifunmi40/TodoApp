import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="flex justify-center items-center mt-10 bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <button 
          type="submit"
          className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
