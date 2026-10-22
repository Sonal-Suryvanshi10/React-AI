import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AQ.Ab8RN6JhAaP13aDBs8dfEoHPVBPclX-qW_ZiWYiknG7dKEmFqA"});

export default async function askAi(question, conversation = [])
{
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: `You are SAKHI, a friendly conversational AI. Answer the user's latest message using the conversation history when it is relevant.
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