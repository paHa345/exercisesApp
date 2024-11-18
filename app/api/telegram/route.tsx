import { NextRequest, NextResponse } from "next/server";

export async function POST(req: any, res: NextResponse) {
  const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
  const body = await req.json();
  console.log(body);
  console.log(body.message.chat.id);
  if (body.message.text === "/start") {
    const message = `Welcome to crossword Game ${body.message.from.username}`;
    const ret = await fetch(
      `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${body.message.chat.id}&text=${message}&parse_mode=HTML`
    );
  }
  return NextResponse.json({ message: "Success", result: "OK!" });
}
