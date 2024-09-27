"use client";

import { Agency } from "@prisma/client";
import React, { useState } from "react";
// import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

type Props = {
  date?: Partial<Agency>;
};
const AgencyDetails = ({ date }: Props) => {
//   const { toast } = useToast();
  const router = useRouter();
  const [deteteAgency, setDeteteAgency] = useState(false);
  
  return <AlertDialog></AlertDialog>;
};
export default AgencyDetails;