import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AQ.Ab8RN6JhAaP13aDBs8dfEoHPVBPclX-qW_ZiWYiknG7dKEmFqA"});

export default async function askAi(question)
{
    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash-lite",
        input: `You have to answere the user's question by following these Rules:
        -Keep the answer short and precise.
        -Use funny and Hinglish Tone.
        -Try to rost the user first and then answer smartly as a layman explanation.
        
    Here is the question: ${question}

    *The ansewer should be in *.
    -Valid JSON with no extra symbols, backticks, or any other characters 
    strict format:
    {
        "greeting": "Greeting to the user well",
        "heading" : "Title of the answer",
        "answer" : "4-5 lines Answer"
    }
    
    `,
    })

    return interaction.output_text;
}