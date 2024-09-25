import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AgencyPage =  async () => {
  const authUser = await currentUser();
  if(!authUser) return redirect('/sign-in')
  return <div>Agency Dashboard</div>;
};

export default AgencyPage;