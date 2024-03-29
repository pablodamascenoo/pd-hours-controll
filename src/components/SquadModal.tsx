"use client";

import React, { FormEvent, useState } from "react";
import BaseModal from "./BaseModal";
import Input from "./Input";
import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";
import ErrorCard from "./ErrorCard";
import { AnimatePresence } from "framer-motion";

export default function SquadModal() {
  const [name, setName] = useState("");
  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState({
    input: "",
    text: "",
  });
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    if (showModal)
      return (
        <BaseModal handleClose={() => setShowModal(false)}>
          <h2 className="font-medium text-[38px] mb-[64px]">Criar Squad</h2>
          {error.text.length ? (
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
              error={error.input}
              title="NOME DA SQUAD"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              disabled={submited}
              required
              id="name"
              type="text"
              placeholder="Digite o nome da squad"
            />
            <Button type="submit" id="button_squad_modal" disabled={submited}>
              {submited ? <LoaderSpinner /> : "Criar squad"}
            </Button>
          </form>
        </BaseModal>
      );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmited(true);
    const response = fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/squad", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    response.then((res) => {
      res.json().then((obj) => {
        if (res.ok) {
          setSubmited(false);
          window.location.reload();
        } else {
          setError({ input: "name", text: obj.message });
          return setSubmited(false);
        }
      });
    });

    response.catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Criar Squad</Button>
      <AnimatePresence>{handleModal()}</AnimatePresence>
    </>
  );
}
