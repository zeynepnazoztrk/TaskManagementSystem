import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/errorHandler";
import type { LoginRequest } from "../types/user";

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: { username: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<Messages>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequest) => {
    setLoading(true);
    try {
      await login(data);
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
        <h2 className="text-center text-3xl font-bold mb-6">Login</h2>
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
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Password
                  placeholder="Password"
                  feedback={false}
                  toggleMask
                  {...field}
                />
              )}
            />
            {errors.password && (
              <small className="p-error block mt-1">
                {errors.password.message}
              </small>
            )}
          </div>
          <Button type="submit" label="Login" loading={loading} />
          <div className="flex justify-content-center gap-1 text-sm">
            <span>Don't have an account?</span>
            <Link
              to="/register"
              className="font-bold no-underline"
              style={{ color: "inherit" }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
