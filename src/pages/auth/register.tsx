import { Button, Input, Layout, Modal, registerSchema } from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, PassLockIcon } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreateUserApi } from "../../services";

const Reigister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: object) => {
    setIsLoading(true);
    try {
      const response = await CreateUserApi({ ...data });
      if (typeof response === "object") {
        const userResponse = response as unknown as {
          token: string;
        };
        globalThis.localStorage.setItem("token", userResponse.token);
        navigate("/login");
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div className="flex justify-center items-center h-[42rem] px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="auth-card">
          <h1 className="h1 pb-7 text-gp-purple-500">Register</h1>
          <div className="space-y-6">
            <Input
              label="Username"
              placeholder="e.g ayo"
              {...register("username")}
              prefix={<MailIcon />}
              errorMessage={errors.username?.message as string}
            />
            <Input
              label="Email Address"
              placeholder="e.g John419@gmail.com"
              {...register("email")}
              prefix={<MailIcon />}
              errorMessage={errors.email?.message as string}
            />

            <Input
              label="Password"
              placeholder="************"
              type="password"
              {...register("password")}
              prefix={<PassLockIcon />}
              errorMessage={errors.password?.message as string}
            />
            <Input
              label="Confirm Password"
              placeholder="************"
              type="password"
              {...register("confirm_password")}
              prefix={<PassLockIcon />}
              errorMessage={errors.confirm_password?.message as string}
            />
          </div>
          <div className="my-2 pbody-12">
            Already have an account?{" "}
            <Link to="/login" className="text-gp-purple-500">
              Log In
            </Link>
          </div>
          <Button
            text={"Register"}
            className="btn-gp float-right"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          />
        </form>
      </div>
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="h1 text-center text-green-500">
          Account Registered Successfully
        </div>
        <div className="text-center py-2">
          <Link to="/login" className="text-gp-purple-500">
            Proceed to Log In
          </Link>
        </div>
      </Modal>
    </Layout>
  );
};
export default Reigister;
