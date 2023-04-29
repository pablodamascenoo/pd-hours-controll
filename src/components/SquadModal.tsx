"use client";

import React, { FormEvent, useState } from "react";
import BaseModal from "./BaseModal";
import Input from "./Input";
import Button from "./Button";

type Props = {
  handleClose: () => void;
};

export default function SquadModal({ handleClose }: Props) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const response = fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/squad", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    response.then((res) => {
      res.json().then((obj) => {
        window.location.reload();
      });
    });

    response.catch((error) => {
      console.log(error);
    });
  }

  return (
    <BaseModal handleClose={handleClose}>
      <h2 className="font-medium text-[38px] mb-[64px]">Criar Squad</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full gap-8"
      >
        <Input
          title="NOME DA SQUAD"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          id="name"
          type="text"
          placeholder="Digite o nome da squad"
        />
        <Button type="submit">Criar squad</Button>
      </form>
    </BaseModal>
  );
}
