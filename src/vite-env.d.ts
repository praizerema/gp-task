/// <reference types="vite/client" />

import { ReactElement } from "react";

interface NavLinkProps {
	href: string;
	title: string;
	icon?: ReactElement
}

interface BasicInfoFormData {
	full_name: string;
	email: string;
  }
  
  interface PasswordInfoFormData {
	password: string;
	confirm_password: string;
  }

  interface IPostProps {
	url: string;
	payload?: object;
}

interface UserProps {
	address?: string;
	company_id: string;
	company_name: string;
	createdAt: Date;
	email: string;
	firstName: string;
	isActive: boolean;
}

interface UserProps {
	full_name: string,
    email: string,
    is_verified: boolean,
    user_id: string
}


interface MessageProps {
	title: string;
	message: string;
	data: never;
	percentage: number;
	stage: string;
  }


  type Content = {
	FRENCH: string;
	ENGLISH: string;
  };

  type ProjectObject = {
	additional_info: string;
	company_brand_color: string;
	company_logo_url: string | null;
	company_name: string;
	content: Content;
	content_types: string[];
	date_created: string; // ISO 8601 date format
	date_updated: string; // ISO 8601 date format
	email_address: string;
	files: []; // Array of files, adjust if specific file structure is known
	frequency: string;
	generation_status: string;
	geographic_regions: string[];
	image_url: string | null;
	industries: string[];
	languages: string[];
	newsletter_id: string;
	newsletter_topic: string;
	project_name: string;
	project_type: string;
	user_id: string;
  };
