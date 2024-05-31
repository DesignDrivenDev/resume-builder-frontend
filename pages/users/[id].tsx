import { GetServerSideProps } from "next";
import axios from "axios";
import PDFResumeDownload from "../../components/PDFResume";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobileNumber: string;
  experiences: string[];
  projects: string[];
  hobbies: string[];
  socialMediaUrls: string[];
};

type UserPageProps = {
  user: User;
};

const UserPage: React.FC<UserPageProps> = ({ user }) => (
  <div>
    <h1>
      {user.firstName} {user.lastName}&lsquo;s Resume
    </h1>
    <PDFResumeDownload user={user} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const response = await axios.get(`http://localhost:8080/resumes/${id}`);
  return {
    props: {
      user: response.data,
    },
  };
};

export default UserPage;
