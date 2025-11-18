# react-quiz

React quiz rich in features

## Description

This is a React-based quiz application built with Vite for fast development and optimal performance.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/robertpfaff/react-quiz.git
   cd react-quiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
react-quiz/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # React components
│   ├── App.jsx      # Main application component
│   ├── App.css      # Application styles
│   ├── index.css    # Global styles
│   └── main.jsx     # Application entry point
├── index.html       # HTML template
├── package.json     # Project dependencies and scripts
└── vite.config.js   # Vite configuration
```

## Adding Your Existing Files

If you have existing quiz application files on your local machine, you can add them to this repository:

1. Copy your files into the appropriate directories in this structure
2. Update the imports in `App.jsx` to use your components
3. Stage and commit your changes:
   ```bash
   git add .
   git commit -m "Add quiz application files"
   git push origin main
   ```

## Technologies Used

- React 19
- Vite 7
- ESLint for code linting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
