import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/errorHandler";
import type { CreateUser } from "../types/user";

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<Messages>(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateUser) => {
    setLoading(true);
    try {
      await register(data);
      navigate("/");
    } catch (error) {
      messagesRef.current?.show({
        severity: "error",
        detail: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <div className="w-25rem">
        <h2 className="text-center text-3xl font-bold mb-6">Register</h2>
        <Messages ref={messagesRef} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-4"
        >
          <div>
            <span className="p-float-label">
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <InputText
                    id="username"
                    className="app-input w-full"
                    {...field}
                  />
                )}
              />
              <label htmlFor="username">Username</label>
            </span>
            {errors.username && (
              <small className="p-error block mt-1">
                {errors.username.message}
              </small>
            )}
          </div>
          <div>
            <span className="p-float-label">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <InputText
                    id="email"
                    className="app-input w-full"
                    {...field}
                  />
                )}
              />
              <label htmlFor="email">Email</label>
            </span>
            {errors.email && (
              <small className="p-error block mt-1">
                {errors.email.message}
              </small>
            )}
          </div>
          <div>
            <span className="p-float-label">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <InputText
                    id="firstName"
                    className="app-input w-full"
                    {...field}
                  />
                )}
              />
              <label htmlFor="firstName">First name</label>
            </span>
            {errors.firstName && (
              <small className="p-error block mt-1">
                {errors.firstName.message}
              </small>
            )}
          </div>
          <div>
            <span className="p-float-label">
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <InputText
                    id="lastName"
                    className="app-input w-full"
                    {...field}
                  />
                )}
              />
              <label htmlFor="lastName">Last name</label>
            </span>
            {errors.lastName && (
              <small className="p-error block mt-1">
                {errors.lastName.message}
              </small>
            )}
          </div>
          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <Password placeholder="Password" toggleMask {...field} />
              )}
            />
            {errors.password && (
              <small className="p-error block mt-1">
                {errors.password.message}
              </small>
            )}
          </div>
          <Button type="submit" label="Register" loading={loading} />
          <div className="flex justify-content-center gap-1 text-sm">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="font-bold no-underline"
              style={{ color: "inherit" }}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
