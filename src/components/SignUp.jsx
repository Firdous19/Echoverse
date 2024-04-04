import { Input } from "../components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components";
import { appwriteAuth } from "../appwrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      const user = await appwriteAuth.signUp(data);
      if (!user) {
        throw new Error("Sign up failed");
      }
      console.log("Sign up success", user);
      window.alert("Sign up success");
      navigate("/login");
    } catch (error) {
      console.log("Sign up Error", error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className=" mb-10 shadow-xl rounded-xl mx-auto w-[600px] p-10 space-y-4 my-10">
        <div className="text-center space-y-3">
          <p className="text-3xl font-bold">Sign up for an account</p>
          <div>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link className="text-black" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-6 "
          noValidate={true}
        >
          <div>
            <Input
              label="Username"
              type="text"
              name="text"
              {...register("userName", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            <p className="text-red-500 mt-2">
              {errors.name ? `*${errors.name.message}` : ""}
            </p>
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <p className="text-red-500 mt-2">
              {errors.email ? `*${errors.email.message}` : ""}
            </p>
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                validate: {
                  length: (fieldValue) => {
                    return (
                      fieldValue.length >= 8 ||
                      "Password should be at least 8 characters long"
                    );
                  },
                },
              })}
            />
            <p className="text-red-500 mt-2">
              {errors.password ? `*${errors.password.message}` : ""}
            </p>
          </div>

          <Button type="submit">Sign up</Button>
        </form>
      </div>
    </>
  );
}
