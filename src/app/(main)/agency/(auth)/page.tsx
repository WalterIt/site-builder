import AgencyDetails from "@/components/forms/agency-details";
import { SUBACCOUNT } from "@/lib/constants";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";

const AgencyPage =  async ({
  searchParams,
}: {
  searchParams: { plan: Plan; state: string; code: string };
}) => {
  const agencyId = await verifyAndAcceptInvitation();
  console.log(`agencyId: ${agencyId}`);
  

  const user = await getAuthUserDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect(SUBACCOUNT);
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("__")[0];
        const stateAgencyID = searchParams.state.split("___")[1];
        if (!stateAgencyID) {
          return <div>NOT AUTHORIZED!</div>;
        }
        return redirect(
          `/agency/${stateAgencyID}/${statePath}?code=${searchParams.code}`
        );
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>NOT AUTHORIZED!</div>;
    }
  }

  const authUser = await currentUser();

  return (
    <div className="flex justify-center items-center mt-4">
    <div>
      <AgencyDetails />
    </div>
  </div>
  )
};

export default AgencyPage;