import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res: NextResponse) => {
  const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
  console.log(req.body);
  return NextResponse.json({ message: "Success", result: "OK!" });
};
