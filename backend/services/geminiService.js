const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeBill(billText) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `
Extract the bill information.

Bill Text:

${billText}

Return ONLY valid JSON.

{
  "merchant": "",
  "amount": 0,
  "category": "",
  "billingCycle": "",
  "renewalDate": ""
}
`,
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  analyzeBill,
};