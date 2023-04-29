import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, squadId, estimatedHours } = await request.json();

  const find = await prisma.squad.findFirst({
    where: {
      id: squadId,
    },
  });

  if (!find) {
    return NextResponse.json({ message: "squad not found" }, { status: 404 });
  }

  const res = await prisma.employee.create({
    data: {
      name,
      estimatedHours,
      squadId,
    },
  });

  return NextResponse.json({ res }, { status: 201 });
}

export async function GET(request: Request) {
  const res = await prisma.employee.findMany({});

  return NextResponse.json({ employees: res }, { status: 200 });
}
