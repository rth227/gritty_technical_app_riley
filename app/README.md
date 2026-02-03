## 1. Loom demo link
(link will go here)

## 2. Setup instructions:

- Install dependencies - npm install
- Create a .env.local file with your ANTHROPIC_API_KEY. 
- Run the server - npm run dev 
- Open as local address - http://localhost:3000

## 3. Description of features implemented:
- Interactive chat interface using Anthropic's Claude AI. The frontend allows users to type messages inside of the message bar and submit their ideas. While the AI is formulating a response, there will be a typing bubble, and then the frontend will display the content produced. 
- Messages are displayed in chronological order (using useState) and also have timestamps, located on the bottom of the bubble. There is a clear distinction between the user's messages and the AI's responses. No empty input is accepted from the user. There is a counter at the bottom right of the chat screen that counts the characters in the user's message, since it is limited to ~1000 characters.
- Error messages are created if there is an issue with the API connection or an error in general. Error handling on the actual chatbot page is done using a try catch block. 

## 4. Any libraries or tools used:
- Anthropic's Claude AI (for API key), Sonnet 4 Model 
- Next.js, React, Typescript, Tailwind CSS, Npm 

## 5. Known issues or limitations:

- One limitation on the user side is that I capped the messages to 1000 characters. 
- There is no authentication process currently, so anyone could access this with an API key. 
- Error messages are not super descriptive, which could be fixed for more specific errors as the platform gets more complicated. 
- I tested a good number of prompts using the AI, but obviously was not able to test everything. 

## 6. If you had more time, what would you improve?

- Improve the frontend of the page. I had Claude walk me through the basics of HTML, CSS, and Typescript but would like to explore these more in future projects. 
- More features displayed on the frontend - editing messages, copying to clipboard, chat history, emoji reactions, response rating, checklists/notes located on the side of the UI, current date/time displays. These features could create a more immersive experience. 