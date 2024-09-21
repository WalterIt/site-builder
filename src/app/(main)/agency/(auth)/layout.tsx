import {ReactElement} from "react";

const AuthLayout = ({children}:{children: ReactElement}) => {
  return (
    <div className={"h-full flex items-center justify-center"}>
      {children}
    </div>
  )
}
export default AuthLayout;