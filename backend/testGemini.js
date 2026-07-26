require("dotenv").config();

const { analyzeBill } = require("./services/geminiService");

const sampleBill = `
Netflix

Amount: ₹499

Subscription

Monthly

Renewal Date: 25 August 2026
`;

async function main() {
  const result = await analyzeBill(sampleBill);

  console.log(result);
}

main();