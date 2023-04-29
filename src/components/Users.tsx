"use client";

import { Employee } from "@prisma/client";
import React, { useEffect, useState } from "react";
import SadFace from "@/../public/emoji_notfound.svg";
import Image from "next/image";
import Button from "./Button";

type Props = {
  changeModal: (text: "squad" | "user" | "report" | "") => void;
};

export default function Users({ changeModal }: Props) {
  const [users, setUsers] = useState<Employee[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL;

    const response = fetch(url + "/api/employee", {
      method: "GET",
    });

    response.then((res) => {
      res.json().then((obj) => {
        console.log(obj);
        setUsers([...obj.employees]);
      });
    });

    response.catch((error) => {
      console.log(error);
    });
  }, []);

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
              Nenhuma squad cadastrada. Crie uma squad para começar.
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
        <Button onClick={() => changeModal("user")}>Criar Usuário</Button>
      </div>
    </section>
  );
}
