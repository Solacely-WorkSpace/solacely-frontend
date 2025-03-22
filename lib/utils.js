import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

import { object, string, number, date, InferType } from "yup";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const formShema = object({
  firstName: string().min(4, 'Has to be a minimum of 3 characters').required(),
  lastName:  string().min(4, 'Has to be a minimum of 3 characters').required(),
  email: string().min(8, 'must be greater than 8 characters').required(),
  password: number().min(8, 'must be greater than 8 numbers').required(),
  phoneNumber: number().min(10, 'must be greater than up to 10 numbers').required(),
  confirmPassword: number().min(8).required()
})


export const Stringify = (data) => JSON.parse(JSON.stringify(data));