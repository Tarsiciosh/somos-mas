import React, { useState, useEffect } from "react";
import "./ProgressOng.css";
export default function ProgressOng() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let timer = window.setTimeout(function () {
      if (progress < 100) {
        const newProgress = progress + 10;
        setProgress(newProgress);
      } else {
        window.clearTimeout(timer);
        setProgress(0);
      }
    }, 500);
    return () => {
      window.clearTimeout(timer);
    };
  }, [progress]);
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
