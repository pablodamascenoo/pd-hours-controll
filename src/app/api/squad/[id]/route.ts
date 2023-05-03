import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json(
      { message: "id deve ser um número" },
      { status: 400 }
    );

  const squad = await prisma.squad.findFirst({
    where: {
      id,
    },
  });

  const users = await prisma.employee.findMany({
    where: {
      squadId: id,
    },
  });

  const data = {
    id: squad?.id,
    name: squad?.name,
    users: [...users],
  };

  return NextResponse.json({ ...data }, { status: 200 });
}
