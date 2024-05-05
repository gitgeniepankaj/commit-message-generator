# Automated Commit Message Generator

## Overview
This project is an Automated Commit Message Generator that utilizes OpenAI's GPT / GROQ models to generate meaningful commit messages based on code changes. It's designed to help developers streamline their workflow by automating the creation of concise, informative commit messages.

## Prerequisites
Before you begin, ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

## Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/gitgeniepankaj/commit-message-generator.git
cd commit-message-generator
```

Install the required dependencies:
```bash
npm install
```

## Configuration

Create a .env file in the root directory of your project and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here 
GROQ_API_KEY=your_groq_api_key_here
ENGIN=groq  #openai
```

## Usage

To start the application, run:

```bash
node src/index.js 'Repository folder path'
```

This will generate a commit message based on predefined code differences. You can modify `src/index.js` to handle real code differences as per your project needs.

## Structure
`src/ai`: Contains the integration with OpenAI/GROQ for generating commit messages.

`src/git`: Contains utilities to manage and interpret Git operations.

`src/index.`js`: The main entry point for the application.

## Contributing

Contributions are welcome! Please read our contributing guide for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the LICENSE file for details.