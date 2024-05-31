import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataFromStorage = localStorage.getItem("userData");
      const userData = userDataFromStorage
        ? JSON.parse(userDataFromStorage)
        : null;
      setCurrentUser(userData?.name);
    }
  }, []);
  console.log(currentUser, "currentUser");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:8080/resumes");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/delete-resume/${id}`);
      // @ts-ignore
      setUsers(users.filter((user) => user?._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const removeDataFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userData");
    }
    router.push("/admin/login");
  };

  return (
    <>
      <div className="flex">
        <div className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-24 max-sm:hidden lg:w-[264px] bg-gray-100">
          <div>
            <Link
              href={"/"}
              className="font-bold bg-white shadow-md w-full  p-2 rounded-md flex gap-4"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </span>{" "}
              <p>Home</p>
            </Link>
            <p className="font-bold mt-8">Hello {currentUser}</p>
          </div>
          <div className="font-bold bg-white shadow-md w-full  p-2 rounded-md flex gap-4">
            <div
              onClick={() => removeDataFromLocalStorage()}
              className="cursor-pointer"
            >
              {currentUser ? (
                "Logout"
              ) : (
                <Link href={"/admin/login"}>Login</Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-14">
          <h1 className="font-bold py-3">User Resume List</h1>
          <table className="text-left border border-black">
            <thead>
              <tr>
                <th className="border border-black p-1">First Name</th>
                <th className="border border-black p-1">Last Name</th>
                <th className="border border-black p-1">Email</th>
                <th className="border border-black p-1">Actions</th>
              </tr>
            </thead>
            <tbody className="border border-black">
              {users.map((user: any) => (
                <tr key={user._id}>
                  <td className="border border-black p-1">{user.firstName}</td>
                  <td className="border border-black p-1">{user.lastName}</td>
                  <td className="border border-black p-1">{user.email}</td>
                  <td className="flex justify-around p-1">
                    <button
                      className="px-2 py-1 border border-gray-400 text-xs rounded-md"
                      onClick={() => router.push(`/admin/${user._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 border border-gray-200 bg-red-700 text-white rounded-md text-xs"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
