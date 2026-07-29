import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is missing." },
        { status: 500 }
      );
    }

    const { prompt, context, type } = await req.json();

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    let systemInstruction = `You are EduFlow AI, an elite intelligent learning assistant for EduFlow LMS. 
Your goal is to help students learn faster, explain complex concepts clearly with concise breakdowns, key takeaways, and practical examples.
Keep answers formatted nicely with bullet points and clear markdown styling where helpful.
Always maintain an encouraging, academic, yet modern tone.`;

    if (type === "quiz_gen") {
      systemInstruction = `You are EduFlow Quiz AI. Generate a 3-question multiple-choice quiz on the topic requested. 
Return your response in clean JSON format with an array of questions, each having:
question (string), options (array of 4 strings), correctIndex (number 0-3), explanation (string).`;
    } else if (type === "summarize") {
      systemInstruction = `You are EduFlow Note Summarizer. Summarize the user's lesson notes or transcript into concise bullet points with key takeaways, action steps, and flashcard concepts.`;
    } else if (type === "code_review") {
      systemInstruction = `You are EduFlow Code Mentor. Review the code snippet, point out any bugs or potential optimizations, and explain line-by-line solutions clearly.`;
    }

    const fullPrompt = context
      ? `[Current Lesson Context: ${context}]\n\nUser Question: ${prompt}`
      : prompt;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      reply: response.text || "I couldn't process that request at the moment.",
    });
  } catch (error: any) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate AI response." },
      { status: 500 }
    );
  }
}
