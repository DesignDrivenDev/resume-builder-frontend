import AdminLogin from "@/components/AdminLogin";

const Login: React.FC = () => (
  <div className="bg-gray-100">
    <div className="max-w-2xl mx-auto h-screen grid place-items-center ">
      <div className="border-2 p-10 rounded-md">
        <h1 className="text-center pb-4 font-bold">Admin Login</h1>
        <AdminLogin />
      </div>
    </div>
  </div>
);

export default Login;
