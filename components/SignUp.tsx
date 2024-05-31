import { useRouter } from "next/router";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SignUpForm
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/user-signup",
        formData
      );
      console.log("Signup successful:", response.data);
      setSuccessMessage("Signup successful! You can now login.");
      router.push("/admin/login");
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
            className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
            className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
            className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
          />
        </div>
        <button
          className=" py-2 bg-blue-950 text-white mt-4 rounded-md w-full"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <div className="pt-6">
        <p className="text-sm text-gray-600">
          No account?
          <Link href={`/admin/login`} className="underline">
            Login
          </Link>
        </p>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
    </div>
  );
};

export default SignUp;
