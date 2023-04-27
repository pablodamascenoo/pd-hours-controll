"use client";
import Image from "next/image";
import Logo from "../../public/pd_icon.svg";
import Button from "@/components/Button";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState<"squads" | "users">("squads");
  return (
    <main className={`bg-gray-1 flex min-h-screen flex-col text-base-black`}>
      <header className="w-full bg-white h-[235px] px-[160px] pt-4 border-b-[1px] border-gray-2">
        <div className="w-full flex justify-between">
          <Image src={Logo} width={50} alt="pd logo" />
          <p className="text-gray-3">Interface para lançamento de horas</p>
        </div>
        <div className="w-full flex justify-between mt-[40px] items-center">
          <h1 className="text-[50px] font-medium">PD Hours</h1>
          <Button>Lançar horas</Button>
        </div>
        <div className="flex gap-[66px] mt-[20px] items-start">
          <button
            className="text-gray-3 pb-4"
            onClick={() => {
              setPage("squads");
            }}
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
          </button>
          <button
            className="text-gray-3 pb-4"
            onClick={() => {
              setPage("users");
            }}
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
          </button>
        </div>
      </header>
    </main>
  );
}
