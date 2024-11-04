import { useEffect, useState } from "react";
import { addTitleSchema, Button, Input, Layout, Modal } from "../../components";
import { CreateTitle, GetAllTitles } from "../../services";
import { TitleObjType } from "../../vite-env";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingTitleList, TitleList } from "./TitleList";
import { WalletConnection } from "./WalletConnection";
import { useSDK } from "@metamask/sdk-react";

const Dashboard = () => {
  const [titles, setTitles] = useState<TitleObjType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTitles, setIsLoadingTitles] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const { connected } = useSDK();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addTitleSchema) });

  const fetchData = async () => {
    setIsLoadingTitles(true);
    try {
      const data = (await GetAllTitles()) as unknown as TitleObjType[];
      setTitles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTitles(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showSuccessModal]);

  const onSubmit = async (data: object) => {
    setIsLoading(true);
    try {
      const response = await CreateTitle({ ...data });
      console.log(response);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="px-5 lg:px-28 my-8 h1 text-gp-purple-500/90">
        Welcome, User
      </h1>
      <div className="px-5 lg:px-28 grid grid-cols-12 gap-x-0 lg:gap-x-10 gap-y-10 pb-10">
        <div className="bg-white/70 lg:max-h-[35rem] rounded-3xl border p-10 col-span-12 lg:col-span-8 order-last lg:order-first">
          {!connected && (
            <p className="text-gray-500 mb-4">
              Please connect your wallet to add title
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-start mb-8 gap-3"
          >
            <Input
              placeholder="e.g Bitcoin mining"
              {...register("title")}
              errorMessage={errors.title?.message as string}
            />
            <Button
              className="btn-gp w-full md:w-[9rem]"
              type="submit"
              loading={isLoading}
              disabled={!connected}
              text="Add Title"
            />
          </form>
          {isLoadingTitles ? LoadingTitleList : <TitleList titles={titles} />}
        </div>
        <WalletConnection />
      </div>
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="h1 text-center text-green-500">
          Title Submitted Successfully
        </div>
      </Modal>
    </Layout>
  );
};

export default Dashboard;
