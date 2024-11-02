import { z } from "zod";


export const addTitleSchema = z.object({
    title: z.string().min(3, 'Enter at least 3 characters')})