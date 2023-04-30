"use client";

import { Report } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import BaseModal from "./BaseModal";
import Input from "./Input";
import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";
import ErrorCard from "./ErrorCard";
import { AnimatePresence } from "framer-motion";

export default function ReportModal() {
  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState({
    text: "",
    input: "",
  });
  const [report, setReport] = useState<Omit<Report, "id" | "createdAt">>({
    employeeId: 0,
    description: "",
    spentHours: 0,
  });
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmited(true);
    setError({ input: "", text: "" });

    if (report.employeeId < 1) {
      setError({
        input: "employeeId",
        text: "id de usuário inválido",
      });
      return setSubmited(false);
    }

    if (report.spentHours < 1) {
      setError({
        input: "spentHours",
        text: "horas devem ser maiores do que 0",
      });
      return setSubmited(false);
    }

    const response = fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/report", {
      method: "POST",
      body: JSON.stringify({ ...report }),
    });

    response.then((res) => {
      res.json().then((obj) => {
        if (res.ok) {
          window.location.reload();
          setSubmited(false);
        } else {
          setError({ input: "squadId", text: obj.message });
          setSubmited(false);
        }
      });
    });

    response.catch((error) => {
      setError({ ...error, text: error.message });
      setSubmited(false);
    });
  }

  function handleModal() {
    if (showModal)
      return (
        <BaseModal
          handleClose={() => {
            setShowModal(false);
          }}
        >
          <h2 className="font-medium text-[38px] mb-[64px]">
            Criar lançamento
          </h2>
          {error.text.length > 0 ? (
            <ErrorCard
              text={error.text}
              handleClose={() => setError({ ...error, text: "" })}
            />
          ) : (
            <></>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full gap-8"
          >
            <Input
              title="id do usuário"
              value={report.employeeId}
              onChange={(e) => {
                setReport({ ...report, employeeId: parseInt(e.target.value) });
              }}
              error={error.input}
              id="employeeId"
              type="number"
              placeholder="Digite o nome do usuário"
              disabled={submited}
              required
            />
            <Input
              title="horas gastas"
              value={report.spentHours}
              onChange={(e) => {
                setReport({ ...report, spentHours: parseInt(e.target.value) });
              }}
              error={error.input}
              id="spentHours"
              type="number"
              placeholder="Digite a quantidade de horas"
              disabled={submited}
              required
            />
            <Input
              style={{ height: "88px" }}
              title="descrição"
              value={report.description}
              onChange={(e) => {
                setReport({ ...report, description: e.target.value });
              }}
              error={error.input}
              id="description"
              type="text"
              placeholder="Digite o Id da squad"
              disabled={submited}
              required
            />
            <Button type="submit" disabled={submited}>
              {submited ? <LoaderSpinner /> : "Criar lançamento"}
            </Button>
          </form>
        </BaseModal>
      );
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Lanças horas</Button>
      <AnimatePresence>{handleModal()}</AnimatePresence>
    </>
  );
}
