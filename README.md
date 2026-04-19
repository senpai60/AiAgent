# AiAgent 🤖

AiAgent is a powerful Node.js backend designed to provide a seamless interface for Google's Gemini AI. It supports both standard JSON responses and real-time streaming using Server-Sent Events (SSE), making it ideal for building responsive frontend applications.

## 🚀 Features

- **Gemini AI Integration**: Leverages Google's latest generative models.
- **Real-time Streaming**: Support for SSE to provide instant feedback to users.
- **Developer Friendly**: Easy to set up and integrate with any frontend framework.
- **Express-based**: Built on the robust Express.js framework.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- A Google Gemini API Key. You can get one from the [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/AiAgent.git
   cd AiAgent
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=8000
   ```

---

## 🏃 Running the Application

### Development Mode (with Nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will be running at `http://localhost:8000`.

---

## 📡 API Documentation

All API routes are prefixed with `/api`.

### 1. Get AI Response (Standard)
Returns a complete response from the AI.

- **URL**: `/api/prompt`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "prompt": "Explain quantum computing in simple terms."
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Prompt received",
    "success": true,
    "data": "Quantum computing is..."
  }
  ```

### 2. Get AI Response (Streaming)
Streams the response from the AI using Server-Sent Events (SSE).

- **URL**: `/api/prompt-stream`
- **Method**: `GET`
- **Query Parameters**:
  - `prompt` (string, required): The text prompt for the AI.
- **Response Type**: `text/event-stream`
- **Example Usage (JavaScript)**:
  ```javascript
  const prompt = "Tell me a story about a robot.";
  const eventSource = new EventSource(`http://localhost:8000/api/prompt-stream?prompt=${encodeURIComponent(prompt)}`);

  eventSource.onmessage = (event) => {
    if (event.data === "[DONE]") {
      eventSource.close();
      return;
    }
    console.log("AI Chunk:", event.data);
  };

  eventSource.onerror = (err) => {
    console.error("EventSource failed:", err);
    eventSource.close();
  };
  ```

---

---

## 🧪 Testing the API

### 1. Built-in Test Frontend
The repository includes a simple HTML page to test the streaming functionality.

- Open `test/index.html` in your browser.
- Ensure the server is running (`npm run dev`).
- Enter a prompt and see the AI response stream in real-time.

### 2. Using cURL

**Standard POST Request:**
```bash
curl -X POST http://localhost:8000/api/prompt \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Hello AI!"}'
```

**Streaming GET Request:**
```bash
curl -N "http://localhost:8000/api/prompt-stream?prompt=Hello%20AI"
```

---

## 📂 Project Structure

```text
AiAgent/
├── src/
│   ├── config/      # Configuration (Env, API keys)
│   ├── controller/  # Request handlers
│   ├── routes/      # API route definitions
│   ├── service/     # Business logic (Gemini API calls)
│   └── app.js       # Express app setup
├── server.js        # Entry point
├── .env             # Environment variables
└── package.json     # Dependencies and scripts
```

---

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.
