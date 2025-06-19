import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "./app.js";

dotenv.config();

const wrapped = serverless(app);

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  // Log the event to help debug
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    const result = await wrapped(event, context);
    console.log('Handler result:', result);
    return result;
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};