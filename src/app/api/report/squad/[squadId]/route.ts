import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { squadId: string };
  }
) {
  const squadId = parseInt(params.squadId);
  if (isNaN(squadId))
    return NextResponse.json(
      { message: "id deve ser um número" },
      { status: 400 }
    );

  const { searchParams } = new URL(request.url);
  const startAt = dayjs(searchParams.get("startAt")).format();
  const endAt = dayjs(searchParams.get("endAt"))
    .add(23, "hours")
    .add(59, "minute")
    .format();

  const reports = await prisma.report.findMany({
    include: {
      employee: {
        select: {
          name: true,
        },
      },
    },
    where: {
      createdAt: {
        gte: startAt,
        lte: endAt,
      },
      employee: {
        squadId,
      },
    },
  });

  const data = {
    startAt,
    endAt,
    reports: [...reports],
  };

  return NextResponse.json(data, { status: 200 });
}
