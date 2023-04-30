import React from "react";
import Image from "next/image";
import Logo from "../../public/pd_icon.svg";
import Button from "@/components/Button";
import Link from "next/link";
import { headers } from "next/headers";
import ReportModal from "./ReportModal";

export default function Header() {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const page = header_url.includes("users") ? "users" : "squads";
  return (
    <header className="w-full bg-white h-[235px] px-[160px] pt-4 border-b-[1px] border-gray-2">
      <div className="w-full flex justify-between">
        <Image src={Logo} width={50} alt="pd logo" />
        <p className="text-gray-3">Interface para lançamento de horas</p>
      </div>
      <div className="w-full flex justify-between mt-[40px] items-center">
        <h1 className="text-[50px] font-medium">PD Hours</h1>
        <ReportModal />
      </div>
      <div className="flex gap-[66px] mt-[20px] items-start">
        <a
          className="text-gray-3 pb-4"
          href={"/"}
          style={
            page === "squads"
              ? {
                  color: "var(--base-black)",
                  borderBottom: "5px solid var(--base-blue)",
                }
              : {}
          }
        >
          Squads
        </a>
        <a
          className="text-gray-3 pb-4"
          href={"/users"}
          style={
            page === "users"
              ? {
                  color: "var(--base-black)",
                  borderBottom: "5px solid var(--base-blue)",
                }
              : {}
          }
        >
          Usuários
        </a>
      </div>
    </header>
  );
}
