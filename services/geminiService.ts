
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const draftPaymentTool: FunctionDeclaration = {
  name: "draftPayment",
  description: "Prepares a payment form with recipient and amount details for the user to confirm.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      recipient: { type: Type.STRING, description: "The wallet ID or UPI ID of the recipient." },
      amount: { type: Type.NUMBER, description: "The amount to transfer." },
      category: { type: Type.STRING, description: "The category of spending (e.g. Food, Shopping)." }
    },
    required: ["recipient", "amount"]
  }
};

export const getFinancialInsights = async (
  transactions: Transaction[], 
  userMessage: string,
  onToolCall?: (args: any) => void
) => {
  const transactionSummary = transactions.map(t => `${t.date}: ${t.type} $${t.amount} to ${t.recipient} (${t.category})`).join('\n');
  
  const prompt = `
    You are Nova, a futuristic financial assistant.
    Current Balance context is available in the app.
    History:
    ${transactionSummary}
    
    User says: ${userMessage}
    
    If the user wants to send money, use the 'draftPayment' tool.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ functionDeclarations: [draftPaymentTool] }],
        systemInstruction: "You are Nova. If a user asks to pay someone, use the draftPayment tool immediately. Otherwise, provide financial advice.",
      },
    });

    if (response.functionCalls && onToolCall) {
      onToolCall(response.functionCalls[0].args);
      return "I've prepared that payment for you. Please review the details in the transfer window.";
    }

    return response.text || "Neural link stable. How can I assist?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Neural interference detected. Please try again.";
  }
};
