import Navigation from "@/components/site/navigation";
import {ReactElement} from "react";

type Props = {
  children: ReactElement;
}
const SiteLayout = ({children}: Props) => {
  return (
    <main className="h-full">
      <Navigation/>
      {children}
    </main>
  )
}

export default SiteLayout;