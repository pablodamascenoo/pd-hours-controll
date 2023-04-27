import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, squadId, estimatedHours } = await request.json();

  const res = await prisma.employee.create({
    data: {
      name,
      estimatedHours,
      squadId,
    },
  });

  return NextResponse.json({ res }, { status: 201 });
}
