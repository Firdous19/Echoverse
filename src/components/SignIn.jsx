import { Input } from "../components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components";
import { appwriteAuth } from "../appwrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import Loader from "react-js-loader";
import toast from "react-hot-toast";

export default function SignIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const session = await appwriteAuth.login(data);
      if (!session) {
        throw new Error("Sign in failed");
      }
      const user = await appwriteAuth.getAccount();

      if (!user) {
        throw new Error("User not found from Sign in component");
      }

      dispatch(login(user));
      //window.alert("Sign in success");
      console.log("User", user);
      setLoading(false);
      toast.success("Sign in success");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log("Sign in Error", error);
      setError("Invalid Credentials");
      toast.error("Invalid Credentials");
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

          <Button className="bg-blue-700 px-4" type="submit">
            Sign In
          </Button>
        </form>
      </div>
      {loading && (
        <div className="absolute top-0 left-0 bg-slate-100 bg-opacity-40 w-full h-full flex justify-center items-center">
          <Loader
            type="spinner-cub"
            bgColor={"#000"}
            title={"Loading..."}
            size={75}
          />
        </div>
      )}
    </>
  );
}
