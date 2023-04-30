"use client";

import { Employee } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import BaseModal from "./BaseModal";
import Input from "./Input";
import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";
import ErrorCard from "./ErrorCard";
import { AnimatePresence } from "framer-motion";

export default function UserModal() {
  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState({
    text: "",
    input: "",
  });
  const [user, setUser] = useState<Omit<Employee, "id">>({
    estimatedHours: 0,
    name: "",
    squadId: 0,
  });
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmited(true);
    setError({ input: "", text: "" });

    if (user.estimatedHours < 1) {
      setError({
        input: "estimatedHours",
        text: "horas devem ser maiores do que 0",
      });
      return setSubmited(false);
    }

    const response = fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/employee", {
      method: "POST",
      body: JSON.stringify({ ...user }),
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
          <h2 className="font-medium text-[38px] mb-[64px]">Criar Usuário</h2>
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
              title="nome do usuário"
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
              error={error.input}
              id="name"
              type="text"
              placeholder="Digite o nome do usuário"
              disabled={submited}
              required
            />
            <Input
              title="Horas estimadas de trabalho"
              value={user.estimatedHours}
              onChange={(e) => {
                setUser({ ...user, estimatedHours: parseInt(e.target.value) });
              }}
              error={error.input}
              id="estimatedHours"
              type="number"
              placeholder="Digite a quantidade de horas"
              disabled={submited}
              required
            />
            <Input
              title="squad"
              value={user.squadId}
              onChange={(e) => {
                setUser({ ...user, squadId: parseInt(e.target.value) });
              }}
              error={error.input}
              id="squadId"
              type="number"
              placeholder="Digite o Id da squad"
              disabled={submited}
              required
            />
            <Button type="submit" disabled={submited}>
              {submited ? <LoaderSpinner /> : "Criar Usuário"}
            </Button>
          </form>
        </BaseModal>
      );
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Criar Usuário</Button>
      <AnimatePresence>{handleModal()}</AnimatePresence>
    </>
  );
}
