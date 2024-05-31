import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
interface LoginForm {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataFromStorage = localStorage.getItem("userData");
      const userData = userDataFromStorage
        ? JSON.parse(userDataFromStorage)
        : null;
      setCurrentUser(userData?.email);
    }
  }, []);
  console.log(currentUser, "currentUser");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof LoginForm
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/user-signin",
        formData
      );
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      router.push("/admin");
      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
          className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
        />
        <button
          className=" py-2 bg-blue-950 text-white mt-4 rounded-md w-full"
          type="submit"
        >
          Login
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="pt-6">
        <p className="text-sm text-gray-500">
          No account?
          <Link href={`/admin/signup`} className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default AdminLogin;
