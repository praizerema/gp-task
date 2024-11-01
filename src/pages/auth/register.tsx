import { Button, Input, Layout, registerSchema } from "../../components"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, PassLockIcon } from "../../assets";

const Reigister = () =>{

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: zodResolver(registerSchema) });
    
      const onSubmit = (data: object) => {
        console.log(data);
      };

    return (
        <Layout>
        <div className="flex justify-center items-center h-[42rem]">
     <form onSubmit={handleSubmit(onSubmit)}className="space-y-6 auth-card">
     <h1 className="h1 pb-5">Register</h1>
     <Input
            label="Username"
            placeholder="e.g John41@gmail.com"
            {...register("email")}
            prefix={<MailIcon />}
            errorMessage={errors.email?.message as string}
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
          {/* <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                //   {...register("remember_me")}
                className="form-checkbox"
              />
              <span className="ml-2">Please Remember me</span>
            </label>

            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}
          <Button
            text={"Log In"}
            className="btn float-right rounded-2xl "
            type="submit"
          />
        </form>
        </div>
    </Layout>
    )
    }
    export default Reigister