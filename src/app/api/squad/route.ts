import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name } = await request.json();

  const find = await prisma.squad.findFirst({
    where: {
      name,
    },
  });

  if (find) {
    return NextResponse.json(
      { message: "Squad já cadastrado" },
      { status: 409 }
    );
  }

  const res = await prisma.squad.create({
    data: {
      name,
    },
  });

  return NextResponse.json({ res }, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const findFirst = searchParams.get("findFirst");
  const res =
    findFirst === "true"
      ? await prisma.squad.findFirst({})
      : await prisma.squad.findMany({});

  return NextResponse.json({ squads: res }, { status: 200 });
}
