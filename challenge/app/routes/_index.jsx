import React, { useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import fs from "fs/promises";
import path from "path";

// Loader function to fetch exercise data
export const loader = async () => {
  const filePath = path.join(process.cwd(), "app", "lessons.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const lessons = JSON.parse(fileContents);
  return lessons.lessons[0].exercises[0];
};

export default function VideoExercise() {
  const exercise = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const isHomePage = window.location.pathname === "/";
    if (isHomePage) {
      navigate("/exercise/af63d9eb-1cbf-44fa-ab37-942fae2d8eaf");
    }
  }, [navigate]);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{exercise.title}</h1>
      <div>
        <iframe
          src={exercise.url}
          width="640"
          height="360"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={exercise.title}
        ></iframe>
      </div>
      <div style={{ marginTop: "20px" }}>
        {exercise.next_exercise_id ? (
          <Link to={`/exercise/${exercise.next_exercise_id}`}>
            <button>Next</button>
          </Link>
        ) : (
          <span>No more exercises</span>
        )}
      </div>
    </div>
  );
}
