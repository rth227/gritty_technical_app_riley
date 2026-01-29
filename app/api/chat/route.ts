// anthropic for claude ai 
import Anthropic from '@anthropic-ai/sdk';
// next js
import { NextResponse } from 'next/server';

// new ai client (api hidden)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// post request to ai 
export async function POST(request: Request) {
try {
    // convert to javascript obj and wait 
    const { message } = await request.json();

    // checking for empty messages 
    if (!message || message.trim() === '') {
    return NextResponse.json(
        { error: 'Please enter a message.' },
        { status: 400 }
    );
    }

    // call api for response (max is ~750 words....)
    const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
        {
        role: 'user',
        content: message,
        },
    ],
    });

    // checking if content is actually a message
    let aiMessage;
    if (response.content[0].type === 'text') {
    aiMessage = response.content[0].text;
    } else {
    // otherwise just output this .. 
    aiMessage = 'Sorry, I didnt get that. Please retype your response.';
    }

    // return ai message
    return NextResponse.json({ response: aiMessage });
} catch (error) {
    // log error
    console.error('Error calling API:', error);

    // return error message
    return NextResponse.json(
      { error: 'Response Failed' },
      { status: 500 } 
    );
  }
}

