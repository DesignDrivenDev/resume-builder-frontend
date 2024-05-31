import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobileNumber: "";
  experiences: string[];
  projects: [{ title: string; descriptions: string[] }];
  hobbies: string[];
  socialMediaUrls: string[];
};

const ResumeList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:8080/resumes");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);
  console.log(users);

  return (
    <div>
      <h1>All User Resumes</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link href={`/users/${user._id}`}>
              <div>
                {user.firstName} {user.lastName} - {user.email}
              </div>
              {/* <div>
                {user.projects.map((el) => (
                  <div key={el.title}>
                    <p>{el.title}</p>
                    <ul>
                      {el?.descriptions.map((el, i) => (
                        <li key={i}>{el}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;
