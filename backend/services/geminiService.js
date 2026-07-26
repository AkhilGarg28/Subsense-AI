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
async function detectSubscription(billData) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `
You are an AI financial assistant.

Analyze this bill:

${JSON.stringify(billData)}

Determine whether it is a recurring subscription.

Examples:
- Netflix → Subscription
- Spotify → Subscription
- Amazon Shopping → Not Subscription
- Electricity Bill → Utility Bill
- Restaurant Bill → Not Subscription

Return ONLY valid JSON.

{
  "isSubscription": true,
  "subscriptionType": "",
  "renewalFrequency": "",
  "confidence": 0.98,
  "reason": ""
}
`,
    });

    const cleanedText = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Subscription Detection Error:", error);
    throw error;
  }
}
async function generateRecommendations(financialData) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `
You are an AI Financial Advisor.

Analyze the following financial information:

${JSON.stringify(financialData)}

Provide 3 practical savings recommendations.

Return ONLY valid JSON.

{
  "recommendations": [
    "",
    "",
    ""
  ]
}
`,
    });

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Recommendation Error:", error);
    throw error;
  }
}
async function predictExpenses(expenseHistory) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `
You are an AI Financial Forecasting Assistant.

A user has the following monthly expenses:

${JSON.stringify(expenseHistory)}

Predict the user's next month's expense based on the trend.

Return ONLY valid JSON.

{
  "predictedExpense": 0,
  "reason": ""
}
`,
    });

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Expense Prediction Error:", error);
    throw error;
  }
}

module.exports = {
  analyzeBill,
  detectSubscription,
  generateRecommendations,
  predictExpenses
};