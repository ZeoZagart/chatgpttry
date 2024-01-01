import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export async function createWithGPT3(prompt) {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
        max_tokens: 2000,
    });
    console.log(`data: ${JSON.stringify(response.data)}`);
    console.log(`status: ${response.status} : ${JSON.stringify(response.statusText)}`);

    return response.data
}




