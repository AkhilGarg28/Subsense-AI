const path = require('path');
const dotenv = require('./backend/node_modules/dotenv');
const mongoose = require('./backend/node_modules/mongoose');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/subsense_ai';

console.log('====================================================');
console.log('Testing Real MongoDB Connection & Database Operations');
console.log('URI:', MONGO_URI);
console.log('====================================================\n');

async function testDatabaseFlow() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB database successfully!');

    const User = require('../backend/models/User');
    const Subscription = require('../backend/models/Subscription');
    const Bill = require('../backend/models/Bill');
    const Chat = require('../backend/models/Chat');

    // 1. User Creation
    const testEmail = `db_user_${Date.now()}@subsense.ai`;
    const user = await User.create({
      name: 'Live DB Test User',
      email: testEmail,
      password: 'Password123!',
    });
    console.log('✅ User inserted into MongoDB:', { id: user._id.toString(), email: user.email });

    // 2. Subscription Creation
    const sub = await Subscription.create({
      user: user._id,
      name: 'Figma Enterprise',
      merchant: 'Figma',
      price: 45.0,
      billingCycle: 'Monthly',
      category: 'Design & Media',
      status: 'Active',
      renewalDate: new Date('2026-08-15'),
    });
    console.log('✅ Subscription written to MongoDB:', { id: sub._id.toString(), name: sub.name, price: sub.price });

    // 3. Bill Creation
    const bill = await Bill.create({
      user: user._id,
      title: 'Cloud Infrastructure',
      merchant: 'AWS',
      amount: 240.0,
      dueDate: new Date('2026-08-01'),
      category: 'Cloud Services',
      status: 'Pending',
    });
    console.log('✅ Bill written to MongoDB:', { id: bill._id.toString(), title: bill.title, amount: bill.amount });

    // 4. Chat Record Creation
    const chat = await Chat.create({
      user: user._id,
      question: 'Summarize my monthly subscription commitments',
      answer: 'You have 1 active subscription (Figma Enterprise - $45.00/mo).',
      model: 'gemini-flash-lite-latest',
      tokensUsed: 42,
    });
    console.log('✅ AI Chat logged in MongoDB:', { id: chat._id.toString(), question: chat.question });

    // 5. Cleanup Test Data
    await Promise.all([
      User.findByIdAndDelete(user._id),
      Subscription.deleteMany({ user: user._id }),
      Bill.deleteMany({ user: user._id }),
      Chat.deleteMany({ user: user._id }),
    ]);
    console.log('✅ Test data cleaned up from MongoDB successfully!');

    await mongoose.disconnect();
    console.log('\n====================================================');
    console.log('Database Connection Verification: 100% SUCCESSFUL');
    console.log('====================================================');
  } catch (err) {
    console.error('❌ Database Test Failed:', err.message);
  }
}

testDatabaseFlow();
