import React, { ReactNode } from "react";
const FormWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex md:flex-row gap-4">{children}</div>;
};
export default FormWrapper;