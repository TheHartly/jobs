// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosResponse, CreateAxiosDefaults } from 'axios';

export default async function handler(req, res) {
  if (req && req.method == "GET"){
    const { slug } = req.query

    const options = {
      method: 'GET',
      url: `https://api.serply.io/v1/job/search/${slug}`,
      headers: {'Content-Type': 'application/json', 'X-Api-Key': process.env.SERPLY_API_KEY}
    };

    const resp = await axios.request(options);
    // console.log(`got resp: ${JSON.stringify(resp.data)}`)
    res.status(200).json(resp.data)
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}
