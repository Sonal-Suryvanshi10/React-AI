import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default async function askAi(question, conversation = [])
{
    if (!apiKey) {
        throw new Error("Missing VITE_GEMINI_API_KEY. Add it to .env.local and restart the dev server.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: `You are BOON.SS, a friendly conversational AI. Answer the user's latest message using the conversation history when it is relevant.
        If the latest message is a follow-up, understand references like "it", "that", or "tell me more" from the earlier messages. If it changes the topic, answer the new topic normally.
        Keep the answer short and precise, in a funny and helpful Hinglish tone. Be warm; do not roast or insult the user.

        Conversation so far, oldest message first (JSON data):
        ${JSON.stringify(conversation)}

        Latest user message: ${JSON.stringify(question)}

        Return only valid JSON with no markdown, backticks, or extra text, using this exact shape:
        {
            "greeting": "A short, friendly response that fits the conversation",
            "heading": "A concise title",
            "answer": "A clear answer in 4-5 short lines"
        }
        `,
    })

    return interaction.output_text;
}