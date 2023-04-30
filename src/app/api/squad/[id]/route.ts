import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = parseInt(params.id);

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
