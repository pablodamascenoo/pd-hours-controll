import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name } = await request.json();

  const res = await prisma.squad.create({
    data: {
      name,
    },
  });

  return NextResponse.json({ res }, { status: 201 });
}

export async function GET(request: Request) {
  const res = await prisma.squad.findMany({});

  return NextResponse.json({ squads: res }, { status: 200 });
}
