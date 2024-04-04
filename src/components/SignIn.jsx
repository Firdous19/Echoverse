import { Input } from "../components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components";
import { appwriteAuth } from "../appwrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setError("");
      const session = await appwriteAuth.login(data);
      if (!session) {
        throw new Error("Sign in failed");
      }
      const user = await appwriteAuth.getAccount();

      if (!user) {
        throw new Error("User not found from Sign in component");
      }

      dispatch(login(user));
      window.alert("Sign in success");
      console.log("User", user);
      navigate("/");
    } catch (error) {
      console.log("Sign in Error", error);
      setError("Invalid Credentials");
    }
  };

  return (
    <>
      <div className=" mb-10 shadow-xl rounded-xl mx-auto w-[600px] p-10 space-y-4 my-10">
        <div className="text-center space-y-3">
          <p className="text-3xl font-bold">Sign In to your Account</p>
          <div>
            <p className="text-gray-400">
              Don't have an account? &nbsp;
              <Link className="text-black" to="/signup">
                Sign up
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

          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </>
  );
}
