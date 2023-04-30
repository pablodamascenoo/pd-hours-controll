import SquadId from "@/components/SquadId";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function IdSquadPage({ params }: Props) {
  const { id } = params;

  return (
    <main className={`bg-gray-1 flex min-h-screen flex-col text-base-black`}>
      {/* @ts-expect-error Server Component */}
      <SquadId id={id} />
    </main>
  );
}
