import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;

console.log('====================================================');
console.log('Testing Google Gemini API Key Integration');
console.log('API Key:', apiKey ? `${apiKey.substring(0, 8)}...` : 'NOT FOUND');
console.log('====================================================\n');

async function testGemini() {
  if (!apiKey) {
    console.error('ERROR: GEMINI_API_KEY is not defined in .env');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try gemini-1.5-flash model first
    console.log('Testing gemini-1.5-flash model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'Act as SubSense AI Financial Copilot. Give a 1-sentence tip on managing recurring subscriptions.';
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('\n✅ SUCCESS! Gemini API responded:');
    console.log('----------------------------------------------------');
    console.log(text.trim());
    console.log('----------------------------------------------------');
  } catch (err) {
    console.warn('\n⚠️ gemini-1.5-flash model test result:', err.message);
    
    // Try gemini-2.0-flash or gemini-pro fallback
    try {
      console.log('\nTesting gemini-2.0-flash fallback model...');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = 'Act as SubSense AI Financial Copilot. Give a 1-sentence tip on managing recurring subscriptions.';
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('\n✅ SUCCESS! Gemini 2.0 API responded:');
      console.log('----------------------------------------------------');
      console.log(text.trim());
      console.log('----------------------------------------------------');
    } catch (err2) {
      console.error('\n❌ Gemini API test failed:', err2.message);
    }
  }
}

testGemini();
