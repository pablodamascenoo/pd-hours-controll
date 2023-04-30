import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { spentHours, description, employeeId } = await request.json();

  const res = await prisma.report.create({
    data: {
      description,
      employeeId,
      spentHours,
    },
  });

  return NextResponse.json({ res }, { status: 201 });
}
