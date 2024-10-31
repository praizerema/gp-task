import { Button, Input } from "../../components"


 const Login = () =>{

    // const onSubmit = (data: object) => {
    //     console.log(data);
    //   };
return (
    <div>
        <h1 className="bg-red-900">Login</h1>
     <form className="mt-10 space-y-6">
          <Input
            label="Email Address"
            placeholder="e.g John419@gmail.com"
            // {...register("email")}
            // prefix={<MailIcon />}
            // errorMessage={errors.email?.message as string}
          />

          <Input
            label="Password"
            placeholder="************"
            type="password"
            // {...register("password")}
            // prefix={<PassLockIcon />}
            // errorMessage={errors.password?.message as string}
          />
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                //   {...register("remember_me")}
                className="form-checkbox"
              />
              <span className="ml-2">Please Remember me</span>
            </label>

            {/* <Link to="/forgot-password">Forgot Password?</Link> */}
          </div>
          <Button
            text={"Continue"}
            className="btn-primary w-full rounded-2xl"
            // iconAfter={<ArrowRight />}
            type="submit"
            // loading={isPending}
          />
        </form>
    </div>
)
}
export default Login