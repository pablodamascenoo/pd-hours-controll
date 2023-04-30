import { Employee, Report } from "@prisma/client";
import React from "react";
import Reports from "./Reports";

const url = process.env.NEXT_PUBLIC_BASE_URL;

async function getSquad(squadId: string) {
  const response = await fetch(`${url}/api/squad/${squadId}`);

  return response.json();
}

export default async function SquadId({ id }: { id: string }) {
  interface UsersReport extends Report {
    employee: {
      name: string;
    };
  }
  const squad: {
    id: string;
    name: string;
    users: Employee[];
    reports: UsersReport[];
  } = await getSquad(id);

  return (
    <section className="flex flex-col gap-9 mt-[60px] ml-[168px]">
      <h2 className="text-[38px] font-medium">{squad.name}</h2>
      <div className="w-fit px-8 h-fit min-w-[1145px] min-h-[420px] max-h-[555px] rounded-xl bg-white  flex flex-col gap-[64px] justify-center items-center py-[64px]">
        <h3 className="text-[28px]">Horas por membro</h3>
        <Reports squadId={squad.id} users={squad.users} />
      </div>
    </section>
  );
}
