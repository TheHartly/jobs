// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosResponse, CreateAxiosDefaults } from 'axios';
import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })


// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { slug } = req.query;
    if (req && req.method == "GET"){
        const job = JSON.parse(slug);
        let prompt = `I am Jon Doe working as ${job.position} and my phone number is 123-456-7890 with ${Math.floor(Math.random() * 10)} of experience. Write me a resume with highlights, metrics. For the following job description: ${job.description}.`
        // const prompt = `Write a resume for a ${job.position} in the ${job.position} idustry that is around 500 words.`;
        // console.log(`prompt: ${prompt}`)
        // const completion = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: prompt,
        //     max_tokens: 100,
        //     temperature: 0.5,
        // });
        console.log(`Prompt: ${prompt}`);
        let response = await api.sendMessage(prompt);
        console.log(`Response: ${response.text}`);
        res.status(200).send(response.text)
    }
    else {
        res.status(200).json({ name: 'John Doe' })
    }
    // if (req && req.method == "GET"){
    //     const { slug } = req.query
    //     const options = {
    //         method: 'GET',
    //         url: `https://api.serply.io/v1/job/search/${slug}`,
    //         headers: {'Content-Type': 'application/json', 'X-Api-Key': process.env.APIKEY}
    //     };
    //
    //     const resp = await axios.request(options);
    //     // console.log(`got resp: ${JSON.stringify(resp.data)}`)
    //     res.status(200).json(resp.data)
    // } else {
    //     res.status(200).json({ name: 'John Doe' })
    // }
}
