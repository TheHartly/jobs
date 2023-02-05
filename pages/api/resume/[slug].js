// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosResponse, CreateAxiosDefaults } from 'axios';
import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
    const { slug } = req.query;
    if (req && req.method == "GET"){
        const job = JSON.parse(slug);
        let prompt = `I am Jon Doe working as ${job.position} and my phone number is 123-456-7890 with ${Math.floor(Math.random() * 10)} of experience. Write me a resume with highlights, metrics. For the following job description: ${job.description}.`
        console.log(`Prompt: ${prompt}`);
        let response = await api.sendMessage(prompt);
        console.log(`Response: ${response.text}`);
        res.status(200).send(response.text)
    }
    else {
        res.status(200).json({ name: 'John Doe' })
    }
}
