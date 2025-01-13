import { toast } from "react-toastify";

export const copyColorCode = (colorCode: string) => {
  navigator.clipboard.writeText(colorCode);
  toast.info(`Color code ${colorCode} copied `, {
    autoClose: 750,
  });
};
