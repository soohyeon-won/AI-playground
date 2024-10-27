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

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"user", content: "What is the capital of France?" }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });

    console.log("Full response:", response);

    console.log("Assistant's answer:", response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
