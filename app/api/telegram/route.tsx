import { NextRequest, NextResponse } from "next/server";

export async function POST(req: any, res: NextResponse) {
  const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
  console.log(await req.body.json());
  //   if (req.body.message === "/start") {
  const message = `Welcome to crossword Game ${req.body.message}`;
  const ret = await fetch(
    `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=-100991389784&text=${message}&parse_mode=HTML`
  );
  //   }
  return NextResponse.json({ message: "Success", result: "OK!" });
}
