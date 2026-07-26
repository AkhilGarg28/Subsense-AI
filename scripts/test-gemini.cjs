const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const apiKey = process.env.GEMINI_API_KEY;

console.log('====================================================');
console.log('Testing Google Gemini API Key Integration');
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');
console.log('====================================================\n');

async function testGemini() {
  if (!apiKey) {
    console.error('ERROR: GEMINI_API_KEY is missing');
    return;
  }

  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    console.log('Testing model gemini-1.5-flash...');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'Act as SubSense AI Financial Copilot. Give a 1-sentence tip on managing recurring subscriptions.';
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('\n✅ SUCCESS! Gemini 1.5 Flash responded:');
    console.log('----------------------------------------------------');
    console.log(text.trim());
    console.log('----------------------------------------------------');
  } catch (err) {
    console.warn('\n⚠️ gemini-1.5-flash test result:', err.message);

    try {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      console.log('\nTesting model gemini-2.0-flash fallback...');
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = 'Act as SubSense AI Financial Copilot. Give a 1-sentence tip on managing recurring subscriptions.';
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('\n✅ SUCCESS! Gemini 2.0 Flash responded:');
      console.log('----------------------------------------------------');
      console.log(text.trim());
      console.log('----------------------------------------------------');
    } catch (err2) {
      console.error('\n❌ Gemini SDK test result:', err2.message);

      // Testing direct REST API endpoint check
      console.log('\nTesting direct HTTP REST endpoint for Gemini API...');
      try {
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const body = {
          contents: [{ parts: [{ text: "Hello! Give a 1-sentence tip on financial savings." }] }]
        };
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        console.log('REST Endpoint Response Status:', res.status);
        console.log('REST Response:', JSON.stringify(data, null, 2));
      } catch (restErr) {
        console.error('REST fetch error:', restErr.message);
      }
    }
  }
}

testGemini();
