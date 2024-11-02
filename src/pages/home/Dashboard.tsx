import { useEffect, useState } from "react";
import { addTitleSchema, Button, Input, Layout } from "../../components";
import { CreateTitle, GetAllTitles } from "../../services";
import { useSDK } from "@metamask/sdk-react";
import { TitleObjType } from "../../vite-env";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Home = () => {
  const [titles, setTitles] = useState<TitleObjType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addTitleSchema) });

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = (await GetAllTitles()) as unknown as TitleObjType[];
      setTitles(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data: object) => {
    setIsLoading(true);
    try {
      const response = await CreateTitle({ ...data });
      if (typeof response === "object") {
        // const userResponse = response as unknown as {
        //   token: string;
        // };
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const titleList = (
    <>
      {titles &&
        titles.map((title: TitleObjType) => (
          <div
            className="py-5 px-3 border-t-2 border-l-2 shadow-md rounded-2xl border-[#A594F9] flex items-center justify-between"
            key={title.uuid}
          >
            <span className="">{title.title}</span>
            <span>...</span>
          </div>
        ))}
    </>
  );
  return (
    <Layout>
      <h1 className="px-28 my-8 h1">Welcome</h1>
      <div className="px-28 grid grid-cols-12 gap-10">
        {/* {isLoading === true ? "Loadiong" : "Hello"} */}
        <div className="bg-white/70 max-h-[35rem] rounded-3xl border p-10 col-span-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex mb-8 gap-3">
            <Input
              placeholder="e.g Bitcoin mining"
              {...register("title")}
              errorMessage={errors.title?.message as string}
            />
            <Button
              className="btn-gp"
              type="submit"
              loading={isLoading}
              text="Submit"
            />
          </form>
          <div className="grid grid-cols-3 gap-7">{titleList}</div>
        </div>
        <div className="col-span-4 bg-white/70 rounded-3xl border p-8 overflow-hidden">
          <Button text="Connect Your Wallet" onClick={connect} className="btn-gp"/>
          <div className="">
            {connected && (
              <div>
                <>
                  {chainId && `Connected chain: ${chainId}`}
                  <p></p>
                  {account && `Connected account: ${account.slice(0, 12)}...`}
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
