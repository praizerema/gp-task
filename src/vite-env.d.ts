/// <reference types="vite/client" />

import { ReactElement } from "react";

interface NavLinkProps {
  href: string;
  title: string;
  icon?: ReactElement;
}

interface IPostProps {
  url: string;
  payload?: object;
}
interface UserProps {
  full_name: string;
  email: string;
  is_verified: boolean;
  user_id: string;
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
