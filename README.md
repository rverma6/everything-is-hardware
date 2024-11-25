# Hardware Relations

This project is a web application that humorously relates any topic to hardware. It uses a React frontend with Tailwind CSS for styling and a FastAPI backend to handle requests and generate responses using OpenAI's GPT-3.5-turbo model.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js and npm
- Python 3.12
- Vite
- FastAPI
- OpenAI API Key

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python3.12 -m venv venv
   ```

3. Activate the virtual environment:

   - On macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

   - On Windows:

     ```bash
     .\venv\Scripts\activate
     ```

4. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Start the FastAPI server:

   ```bash
   uvicorn api.relate:app --reload
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the frontend.
- Enter a topic in the input box and submit to see how it relates to hardware.

## Project Structure

### Frontend

- **App.tsx**: Main application component.
  ```typescript:frontend/src/App.tsx
  startLine: 1
  endLine: 88
  ```

- **InputForm.tsx**: Component for the input form.
  ```typescript:frontend/src/components/InputForm.tsx
  startLine: 9
  endLine: 52
  ```

- **ResponseDisplay.tsx**: Component for displaying the response.
  ```typescript:frontend/src/components/ResponseDisplay.tsx
  startLine: 1
  endLine: 36
  ```

- **index.css**: Tailwind CSS configuration.
  ```css:frontend/src/index.css
  startLine: 1
  endLine: 3
  ```

- **tailwind.config.js**: Tailwind CSS configuration file.
  ```javascript:frontend/tailwind.config.js
  startLine: 1
  endLine: 34
  ```

### Backend

- **api/relate.py**: FastAPI application for handling requests.
  ```python:api/relate.py
  startLine: 1
  endLine: 58
  ```

## Environment Variables

Create a `.env` file in the `backend` directory and add your OpenAI API key:

OPENAI_API_KEY=your_openai_api_key

For the frontend, ensure the `VITE_API_URL` is set in your environment variables to point to your backend URL.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
