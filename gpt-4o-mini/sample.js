import OpenAI from "openai";
import readline from "readline";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

// readline 인터페이스 설정
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getResponse(userInput) {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"system", content: "한국어로 대답하세요." },
        { role:"user", content: userInput }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });

    console.log("Full response:", response);

    console.log("Assistant's answer:", response.choices[0].message.content);

}
// export async function main() {
//   const client = new OpenAI({ baseURL: endpoint, apiKey: token });
//   const response = await client.chat.completions.create({
//     messages: [
//         { role:"system", content: "You are a helpful assistant." },
//         { role:"user", content: "What is the capital of France?" }
//       ],
//       temperature: 1.0,
//       top_p: 1.0,
//       max_tokens: 1000,
//       model: modelName
//     });

//     console.log("Full response:", response);

//     console.log("Assistant's answer:", response.choices[0].message.content);
// }

// 사용자 입력 받기
rl.question("Ask me anything: ", (input) => {
  getResponse(input).then(() => rl.close());
});