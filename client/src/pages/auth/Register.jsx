import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/store/auth-slice";

let initialState = { userName: "", email: "", password: "" };

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Create new account
        </h1>
        <p className="mt-3 text-gray-600">
          Already have an account?
          <Link
            className="font-medium ml-2 text-indigo-600 hover:text-indigo-500 transition-colors"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AuthRegister;
