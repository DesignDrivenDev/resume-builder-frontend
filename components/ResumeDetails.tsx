import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

type UserFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobileNumber: string;
  experiences: string[];
  projects: { title: string; descriptions: string[] }[];
  hobbies: string[];
  socialMediaUrls: string[];
};

const ResumeDetails: React.FC = () => {
  const [formData, setFormData] = useState<UserFormInputs>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    mobileNumber: "",
    experiences: [""],
    projects: [{ title: "", descriptions: [""] }],
    hobbies: [""],
    socialMediaUrls: [""],
  });
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number,
    subField?: string,
    subIndex?: number
  ) => {
    if (index !== undefined && subField) {
      if (subIndex !== undefined) {
        const newArray = [
          ...(formData[field as keyof UserFormInputs] as {
            title: string;
            descriptions: string[];
          }[]),
        ];
        newArray[index].descriptions[subIndex] = e.target.value;
        setFormData({ ...formData, [field]: newArray });
      } else {
        const newArray = [
          ...(formData[field as keyof UserFormInputs] as {
            title: string;
            descriptions: string[];
          }[]),
        ];
        // @ts-ignore
        newArray[index][subField] = e.target.value;
        setFormData({ ...formData, [field]: newArray });
      }
    } else if (index !== undefined) {
      const newArray = [
        ...(formData[field as keyof UserFormInputs] as string[]),
      ];
      newArray[index] = e.target.value;
      setFormData({ ...formData, [field]: newArray });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleAddField = (field: string, index?: number) => {
    if (field === "projects") {
      setFormData({
        ...formData,
        [field]: [
          ...(formData[field as keyof UserFormInputs] as {
            title: string;
            descriptions: string[];
          }[]),
          { title: "", descriptions: [""] },
        ],
      });
    } else if (field === "descriptions" && index !== undefined) {
      const newProjects = [...formData.projects];
      newProjects[index].descriptions.push("");
      setFormData({ ...formData, projects: newProjects });
    } else {
      setFormData({
        ...formData,
        [field]: [...(formData[field as keyof UserFormInputs] as string[]), ""],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      "http://localhost:8080/resumes",
      formData
    );
    setPdfUrl(response.data.pdfUrl);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      mobileNumber: "",
      experiences: [""],
      projects: [{ title: "", descriptions: [""] }],
      hobbies: [""],
      socialMediaUrls: [""],
    });
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-center py-3">
            Resume Builder
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange(e, "firstName")}
                  placeholder="First Name"
                  className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange(e, "lastName")}
                  placeholder="Last Name"
                  className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                  placeholder="Email"
                  className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="mobileNumber" className="text-sm">
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) => handleChange(e, "mobileNumber")}
                  placeholder="Mobile Number"
                  className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) => handleChange(e, "address")}
                placeholder="Address"
                className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="experiences" className="text-sm">
                Experiences
              </label>
              {formData.experiences.map((exp, index) => (
                <input
                  id="experiences"
                  name="experiences"
                  key={index}
                  value={exp}
                  onChange={(e) => handleChange(e, "experiences", index)}
                  placeholder={`Experience ${index + 1}`}
                  className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddField("experiences")}
                className="border border-gray-300 px-2 py-1 text-xs mt-2 rounded-sm"
              >
                Add Experience
              </button>
            </div>

            <div>
              <label htmlFor="projects" className="text-sm">
                Projects
              </label>
              {formData.projects.map((proj, index) => (
                <div key={index}>
                  <input
                    id="projects"
                    name="projects"
                    value={proj.title}
                    onChange={(e) =>
                      handleChange(e, "projects", index, "title")
                    }
                    placeholder={`Project Title ${index + 1}`}
                    className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {proj.descriptions.map((desc, descIndex) => (
                      <input
                        key={descIndex}
                        value={desc}
                        onChange={(e) =>
                          handleChange(
                            e,
                            "projects",
                            index,
                            "descriptions",
                            descIndex
                          )
                        }
                        placeholder={`Project Description ${index + 1}.${
                          descIndex + 1
                        }`}
                        className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddField("descriptions", index)}
                    className="border border-gray-300 px-2 py-1 text-xs mt-2 rounded-sm"
                  >
                    Add Project Description
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("projects")}
                className="border border-gray-300 px-2 py-1 text-xs mt-2 rounded-sm"
              >
                Add Project
              </button>
            </div>

            <div>
              <label htmlFor="hobbies" className="text-sm">
                Hobbies
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.hobbies.map((hobby, index) => (
                  <input
                    id="hobbies"
                    name="hobbies"
                    key={index}
                    value={hobby}
                    onChange={(e) => handleChange(e, "hobbies", index)}
                    placeholder={`Hobby ${index + 1}`}
                    className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleAddField("hobbies")}
                className="border border-gray-300 px-2 py-1 text-xs mt-2 rounded-sm"
              >
                Add Hobby
              </button>
            </div>

            <div>
              <label htmlFor="socialMediaUrls" className="text-sm">
                Social Media URLs
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.socialMediaUrls.map((url, index) => (
                  <input
                    id="socialMediaUrls"
                    name="socialMediaUrls"
                    key={index}
                    value={url}
                    onChange={(e) => handleChange(e, "socialMediaUrls", index)}
                    placeholder={`URL ${index + 1}`}
                    className="mt-1 p-2 w-full rounded-md border border-gray-200  text-sm focus:outline-none"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleAddField("socialMediaUrls")}
                className="border border-gray-300 px-2 py-1 text-xs mt-2 rounded-sm"
              >
                Add Social Media URL
              </button>
            </div>

            <button
              type="submit"
              className=" py-2 bg-blue-950 text-white mt-4 rounded-md w-full"
            >
              Submit
            </button>

            {pdfUrl && (
              <div className="mt-4">
                <a href={pdfUrl} download className="text-blue-500 underline">
                  Download PDF
                </a>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ResumeDetails;
