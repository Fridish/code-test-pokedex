# Code-Test Pokedex

This repository contains a simple application split into frontend and backend services. Follow the instructions below to set up and run the application on your local machine.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) 
- [.NET SDK](https://dotnet.microsoft.com/download)
  
## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Fridish/code-test-pokedex.git
```

### 2. Run the Application
The application is divided into two parts: the frontend and the backend. Each must be started in its own terminal window.

#### Run the Frontend
Open a terminal and navigate to the frontend directory:

```bash
cd code-test-pokedex.client
```
Install the required dependencies:
```
npm install
```
##### Start the development server:
```bash
npm run dev
```
The frontend should now be running on http://localhost:5173 by default.

#### Run the Backend
Open a second terminal and navigate to the backend directory:

```bash
cd code-test-pokedex.server
```

Start the backend server in watch mode:
```bash
dotnet watch run
```
The backend should now be running on http://localhost:5176 by default.

### Project Structure
- code-test-pokedex.client: Contains the frontend application (built with Node.js)
- code-test-pokedex.server: Contains the backend API (built with .NET)
