import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-purple-700 to-indigo-800 w-1/2 px-12">
        <div className="max-w-md space-y-8 text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-xl">
            Discover amazing products and shop with ease.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
