import { Button, Input, Layout, logInSchema } from "../../components"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, PassLockIcon } from "../../assets";
import { LoginUserApi } from "../../services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";

 const Login = () =>{
    const navigate = useNavigate();
    const {setUser} = useAuthContext()
const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: zodResolver(logInSchema) });
    
      const onSubmit = async(data: object) => {
        console.log(data);
        setIsLoading(true)
        try{
           const response = await LoginUserApi({...data})
           alert("success")
           if (typeof response === "object") {
           const userResponse = response as unknown as {
            token: string
           }
        globalThis.localStorage.setItem("token",  userResponse.token);
        navigate('/')
           }
           setIsLoading(false)

        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(error){
console.log(error)
setIsLoading(false)

// showToast(error, "error");

    }
      };
    
return (
    <Layout>
        <div className="flex justify-center items-center h-[42rem]">
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 auth-card">
     <h1 className="h1 pb-5">Login</h1>

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
export default Login