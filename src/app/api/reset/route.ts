import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: Request) {
  await prisma.report.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.squad.deleteMany({});

  return NextResponse.json({}, { status: 200 });
}
