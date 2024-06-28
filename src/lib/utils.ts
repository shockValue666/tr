import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const timeAgo = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

const numberFormatter = new Intl.NumberFormat('en-US');

export const numberWithCommas = (number : number) => {
  // console.log("number: ",number)
  // console.log("numberFormatter.format(number)", numberFormatter.format(number))
  return numberFormatter.format(number)
}