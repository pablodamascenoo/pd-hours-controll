import { Squad } from "@prisma/client";
import React, { useEffect, useState } from "react";
import SadFace from "@/../public/emoji_notfound.svg";
import Image from "next/image";
import SquadModal from "./SquadModal";
import Link from "next/link";

async function getSquads() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(url + "/api/squad");
  return response.json();
}

export default async function Squads() {
  const { squads } = (await getSquads()) as { squads: Squad[] };

  return (
    <section className="flex flex-col gap-10 mt-[80px] ml-[168px]">
      <h2 className="text-[38px] font-medium">
        {squads.length > 0 ? "Lista de Squads" : ""}
      </h2>
      <div className="w-fit px-8 h-fit min-w-[490px] min-h-[411px] rounded-xl bg-white  flex flex-col gap-[64px] justify-center items-center">
        {squads.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center">
            <Image src={SadFace} alt="not found" />
            <p className="text-gray-3">
              Nenhuma squad cadastrada. Crie uma squad para começar.
            </p>
          </div>
        ) : (
          <table className="w-[743px] rounded-lg overflow-hidden">
            <thead>
              <tr className="h-[43px] bg-base-blue text-white">
                <th className="text-start pl-10">ID</th>
                <th className="text-start pl-20">Nome</th>
              </tr>
            </thead>
            <tbody>
              {squads.map((squad, index) => {
                return (
                  <tr
                    key={index}
                    className="pl-[30px] bg-gray-1 h-[43px] border-b-[1px] border-gray-3"
                    style={{
                      border: index === squads.length - 1 ? "none" : "",
                    }}
                  >
                    <td className="pl-10">{squad.id}</td>
                    <td className="pl-20 flex items-center justify-between h-[43px]">
                      <p>{squad.name}</p>
                      <Link
                        href={"/squads/" + squad.id}
                        className="bg-base-blue w-[122px] flex items-center justify-center h-[33px] rounded-lg text-white mr-1"
                      >
                        Visitar squad
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <SquadModal />
      </div>
    </section>
  );
}
