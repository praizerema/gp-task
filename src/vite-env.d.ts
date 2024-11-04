/// <reference types="vite/client" />

interface IPostProps {
  url: string;
  payload?: object;
}

type TitleObjType = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  uuid: string;
  title: string;
};

type UserObject = {
  username: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  uuid: string;
};
