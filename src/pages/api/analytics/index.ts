import { NextApiRequest, NextApiResponse } from "next";
import trackEvent from "./AnalyticsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const dataToSend = req.body; // Assuming the request body contains the data to be stored
    await trackEvent(dataToSend);
    return res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({ error: "Error inserting data" });
  }
}
