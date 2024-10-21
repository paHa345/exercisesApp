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
