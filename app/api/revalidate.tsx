// import { revalidatePath } from "next/cache";
// import { NextRequest, NextResponse } from "next/server";

// export default async function GET(req: NextRequest, res: NextResponse) {
//   // Check for secret to confirm this is a valid request
//   // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
//   //   return res.status(401).json({ message: 'Invalid token' })
//   // }

//   try {
//     revalidatePath("/", "layout");
//     return Response.json({ revalidated: true, now: Date.now() });
//   } catch (error: any) {
//     // If there was an error, Next.js will continue
//     // to show the last successfully generated page
//     return NextResponse.json({ message: error?.message }, { status: 400 });
//   }
// }

import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    await res.revalidate("/catalog/test");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
