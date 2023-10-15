import { NextApiRequest, NextApiResponse } from 'next';
import trackEvent from './AnalyticsController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body; // Assuming the request body contains the data to be stored
    	console.log(data)

    try {
      await trackEvent(data);

        return res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Error inserting data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
