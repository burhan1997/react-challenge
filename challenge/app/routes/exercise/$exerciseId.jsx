import React from "react";
import { useParams, useLoaderData, json, useNavigate } from "@remix-run/react";
import MultipleChoiceQuestion from "../../components/MultipleChoiceQuestion";
import Navbar from "../../components/Navbar";
import fs from "fs/promises";
import path from "path";
import "./exercises.css";

// loader func to fetch exercise data
export const loader = async ({ params }) => {
  const { exerciseId } = params;
  const filePath = path.resolve("app", "lessons.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const lessons = JSON.parse(fileContents);
  const allExercises = lessons.lessons[0].exercises;
  const exercise = allExercises.find((ex) => ex.id === exerciseId);

  if (!exercise) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ exercise, allExercises });
};

const ExercisePage = () => {
  const { exercise, allExercises } = useLoaderData();
  const { exerciseId } = useParams();
  const navigate = useNavigate();

  if (!exercise) {
    return <div className="loading">Loading...</div>;
  }

  const currentIndex = allExercises.findIndex((ex) => ex.id === exerciseId);
  const previousExercise = allExercises[currentIndex - 1] || null;
  const nextExercise = allExercises[currentIndex + 1] || null;

  const handlePrevious = () => {
    if (previousExercise) {
      navigate(`/exercise/${previousExercise.id}`);
    }
  };

  const handleNext = () => {
    if (nextExercise) {
      navigate(`/exercise/${nextExercise.id}`);
    }
  };

  const progress = ((currentIndex + 1) / allExercises.length) * 100;

  return (
    <div className="page-container">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="content-wrapper">
        {exercise.resourcetype === "VideoExercise" ? (
          <div className="video-content">
            <h1 className="video-title">{exercise.title}</h1>
            <div className="iframe-wrapper">
              <iframe
                src={exercise.url}
                className="iframe"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={exercise.title}
              ></iframe>
            </div>
          </div>
        ) : (
          <MultipleChoiceQuestion question={exercise} />
        )}
      </div>

      <Navbar
        onPrevious={handlePrevious}
        onNext={handleNext}
        canPrevious={currentIndex > 0}
        canNext={currentIndex < allExercises.length - 1}
      />
    </div>
  );
};

export default ExercisePage;
