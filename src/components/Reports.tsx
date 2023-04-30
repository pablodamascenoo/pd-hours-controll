"use client";
import { Employee, Report } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";
import SadFace from "@/../public/emoji_notfound.svg";
import UserModal from "./UserModal";
import dayjs from "dayjs";

type Props = {
  squadId: string;
  users: Employee[];
};

export default function Reports({ squadId, users }: Props) {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  let soma = 0;

  interface UsersReport extends Report {
    employee: {
      name: string;
    };
  }

  type dataType = {
    startAt: string;
    endAt: string;
    reports: UsersReport[];
  };

  const [data, setData] = useState<dataType>({
    startAt: "",
    endAt: "",
    reports: [],
  });

  const { startAt, endAt, reports } = data;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const promise = fetch(
      `${url}/api/report/squad/${squadId}?startAt=${date.startDate}&endAt=${date.endDate}`
    );

    promise.then((res) => {
      res.json().then((obj) => {
        setData({ ...obj });
      });
    });

    promise.catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="flex flex-col gap-5 w-full justify-center items-center">
      <form onSubmit={handleSubmit} className="flex gap-[10px] items-end w-fit">
        <Input
          id="startDate"
          title="início"
          type="date"
          placeholder="01/02/2022"
          style={{ width: "190px" }}
          required
          value={date.startDate}
          onChange={(e) => setDate({ ...date, startDate: e.target.value })}
        />
        <Input
          id="endDate"
          title="fim"
          type="date"
          placeholder="01/02/2022"
          style={{ width: "190px" }}
          required
          value={date.endDate}
          onChange={(e) => setDate({ ...date, endDate: e.target.value })}
        />
        <Button style={{ height: "56px" }}>Filtrar por data</Button>
      </form>
      {reports.length < 1 ? (
        <div className="flex flex-col gap-6 justify-center items-center">
          <Image src={SadFace} alt="not found" />
          {users.length > 1 ? (
            <p className="text-gray-3">
              Nenhum intervalo de data selecionado. Selecione um intervalo para
              começar.
            </p>
          ) : (
            <>
              <p className="text-gray-3">
                Nenhum intervalo de data selecionado. Selecione um intervalo
                para começar.
              </p>{" "}
              <UserModal />
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <h3 className="text-[28px]">Horas por membro</h3>
          <table className="w-[743px] rounded-lg overflow-hidden">
            <thead>
              <tr className="h-[43px] bg-base-blue text-white">
                <th className="text-start pl-5">Membro</th>
                <th className="text-start pl-20">Descrição</th>
                <th className="text-start pl-20">Horas</th>
                <th className="text-start pl-20">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => {
                soma += report.spentHours;
                const date = dayjs(report.createdAt).format("DD/MM/YYYY");
                return (
                  <tr
                    key={index}
                    className="pl-[30px] bg-gray-1 h-[43px] border-b-[1px] border-gray-3"
                    style={{
                      border: index === reports.length - 1 ? "none" : "",
                    }}
                  >
                    <td className="pl-5">{report.employee.name}</td>
                    <td className="pl-20">{report.description}</td>
                    <td className="pl-20">{report.spentHours}</td>
                    <td className="pl-20">{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 className="text-[28px]">Horas totais da squad</h3>
          <h1 className="text-[50px] text-base-blue">{soma}</h1>
          <h3 className="text-[28px]">Média de horas por dia</h3>
          <h1 className="text-[50px] text-base-blue">
            {(soma / (dayjs(endAt).diff(startAt, "days") + 1)).toFixed(2)}{" "}
            Horas/Dia
          </h1>
        </div>
      )}
    </div>
  );
}
