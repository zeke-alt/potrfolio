"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  speed?: number;
  pause?: number;
}

export default function Typewriter({
  words,
  speed = 80,
  pause = 1800,
}: TypewriterProps) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);

          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setDisplay(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);

          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return (
    <span>
      {display}
      <span className="cursor" />
    </span>
  );
}