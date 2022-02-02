import React from "react";
import { useForm } from "react-hook-form";

export const HookForm: React.FC = () => {
  // The next line works with Next.js v11, but breaks with v12.
  useForm();

  return <form>
    <label>Please fill the form</label>
  </form>;
};
