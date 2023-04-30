import React from "react";
import SadFace from "@/../public/emoji_notfound.svg";
import Image from "next/image";
import UserModal from "./UserModal";
import SquadModal from "./SquadModal";
import { Employee, Squad } from "@prisma/client";

async function getUsers() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(url + "/api/employee");

  return response.json();
}

async function getFirstSquad() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(url + "/api/squad?findFirst=true");

  return response.json();
}

export default async function Users() {
  const usersData = getUsers();
  const foundSquadData = getFirstSquad();

  const [users, squads]: [users: Employee[], squads: Squad] = await Promise.all(
    [usersData, foundSquadData]
  );

  return (
    <section className="flex flex-col gap-10 mt-[80px] ml-[168px]">
      <h2 className="text-[38px] font-medium">
        {users.length > 0 ? "Lista de Usuários" : ""}
      </h2>
      <div className="w-fit px-8 h-fit min-w-[490px] min-h-[411px] rounded-xl bg-white  flex flex-col gap-[64px] justify-center items-center">
        {users.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center">
            <Image src={SadFace} alt="not found" />
            <p className="text-gray-3">
              {squads
                ? "Nenhum usuário cadastrado. Crie um usuário para começar."
                : "Nenhuma squad cadastrada. Crie uma squad para começar."}
            </p>
          </div>
        ) : (
          <table className="w-[743px] rounded-lg overflow-hidden">
            <thead>
              <tr className="h-[43px] bg-base-blue text-white">
                <th className="text-start pl-5 w-[60%]">Nome</th>
                <th className="text-start w-[20%]">Horas</th>
                <th className="text-start w-[20%]">Squad ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className=" bg-gray-1 h-[43px] border-b-[1px] border-gray-3"
                    style={{
                      border: index === users.length - 1 ? "none" : "",
                    }}
                  >
                    <td className="pl-5">{user.name}</td>
                    <td className="">{user.estimatedHours}</td>
                    <td>{user.squadId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!squads ? <SquadModal /> : <UserModal />}
      </div>
    </section>
  );
}
