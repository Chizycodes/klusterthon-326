# Diagnosync - AI Health Assistant

**Diagnosync** is an AI-powered health assistant designed to provide answers and diagnoses for health-related questions. It allows users to interact with the assistant via chat, manage their health-related queries through session creation, and keep track of their concerns in an organized manner.

This project was developed during the 7-day **Klusterthon Hackathon**, utilizing modern technologies to create a seamless user experience.

## Features

- **User Registration and Authentication**: Secure sign-up and login system.
- **Session Management**: Users can create, rename, and delete sessions to organize health-related questions.
- **AI Chat Assistant**: Real-time responses to health queries using the OpenAI API.
- **Responsive Design**: Built with Tailwind CSS for a clean and user-friendly interface.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **AI Integration**: [OpenAI API](https://openai.com/api/)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Chizycodes/klusterthon-326.git
    ```

2. **Navigate into the project directory**:

    ```bash
    cd klusterthon-326
    ```

3. **Install frontend dependencies**:

    ```bash
    cd frontend
    npm install
    ```

4. **Install backend dependencies**:

    ```bash
    cd ../backend
    npm install
    ```

5. **Create a `.env` file in the backend directory** and add your OpenAI API key and MongoDB URI:

    ```plaintext
    OPENAI_API_KEY=your-openai-api-key
    MONGODB_URI=your-mongodb-uri
    ```

6. **Start the development server for the backend**:

    ```bash
    npm run dev
    ```

7. **Open another terminal, navigate back to the frontend directory,** and start the development server:

    ```bash
    cd ../frontend
    npm run dev
    ```

8. **Open** [http://localhost:3000](http://localhost:3000) **in your browser to view the app.**


