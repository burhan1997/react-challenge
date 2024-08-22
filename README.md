# react-challenge

## Overview
- The Interactive Exercise Application is a web-based platform designed to offer users a series of interactive exercises, featuring multiple-choice questions and video-based content.
- It includes a progress indicator to visually track user advancement through the exercises.  For exercises that include timed questions, a countdown timer is integrated. If the timer expires before the exercise is completed, users are prompted with a message informing them that time is up, with an option to retry or restart the exercise.
- The platform is built with responsive design principles to ensure that it is accessible and functional across various devices and screen sizes

## Features Implemented
- **Multiple Choice Question Component**: Displays questions with radio buttons for answer selection. Highlights the selected answer and shows the choice below the question.
- **Video Exercise Component**: Embeds responsive videos in an iframe for video-based exercises.
- **Navigation Bar**: Provides 'Previous' and 'Next' buttons for navigating between exercises.
- **Progress Indicator**: Shows a visual progress bar with the percentage of completion based on the user's current position in the exercise series.
- **HTML Content Parsing**: Utilizes the DOMParser method to clean HTML tags from exercise titles and descriptions for a consistent UI.


## Approach
- **Component-based Architecture**: Employs reusable components for modular and maintainable code.
- **Dynamic Content Loading**: Uses the `loader()` function to fetch exercise data dynamically from a JSON file.
- **State Management**: Utilizes React’s `useState` and `useEffect` hooks for managing state and cleaning HTML content.
- **Progress Indicator**: Calculates and displays user progress as a percentage.

## Potential Improvements
- **Quiz Summary & Results Page**: Add a summary page for overall progress and feedback.
- **User Authentication**: Add user profiles for tracking progress across sessions.
- **Advanced Animations**: Enhance user experience with animations for progress and transitions.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/burhan1997/interactive-exercise-app.git


2. **Install dependencies:**
   ```bash
   npm install

4. **Run the development server:**
     ```bash
   npm run dev

5. **Open your browser and go to:**
     ```bash
   http://localhost:3000/exercise/{exerciseId}

## Conclusion
This project illustrates a basic interactive exercise system with dynamic content rendering and progress tracking. Future enhancements could offer a more engaging and comprehensive user experience.

Feel free to contribute or fork the repository to improve it further!
