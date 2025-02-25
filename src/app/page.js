"use client";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { useEventListener } from "usehooks-ts";
const size = 10;

const board = {
  width: 50,
  height: 50,
};

export default function Home() {
  const [head, setHead] = useState({
    top: 0,
    left: 0,
  });
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Arrowup") {
        setDirection("up");
      }
      switch (e.code) {
        case "ArrowUp": {
          setDirection("up");
          break;
        }
        case "ArrowDown": {
          setDirection("down");
          break;
        }
        case "ArrowLeft": {
          setDirection("left");
          break;
        }
        case "ArrowRight": {
          setDirection("right");
          break;
        }
      }
    });
  });

  function gameLoop() {
    let newLeft = head.left;
    let newTop = head.top;
    switch (direction) {
      case "right": {
        newLeft = head.left + 1;
        if (board.width <= newLeft) {
          newLeft = 0;
        }
        break;
      }
      case "up": {
        newTop = head.top - 1;
        if (newTop < 0) {
          newTop = board.height - 1;
        }
        break;
      }
      case "down": {
        newTop = head.top + 1;
        if (board.height <= newTop) {
          newTop = 0;
        }
        break;
      }
      case "left": {
        newLeft = head.left - 1;
        if (newLeft < 0) {
          newLeft = board.width - 1;
        }
        break;
      }
    }
    setHead({ top: newTop, left: newLeft });
  }

  useInterval(() => {
    gameLoop();
  }, 80);

  return (
    <div>
      <header className="text-center mt-10 text-[50px]">
        Welcome to Snake
      </header>
      <div >
      <div
        style={{ width: board.width * size, height: board.height * size }}
        className="bg-pink-300 relative mx-auto mt-20 border-black"
      >
        <div
          style={{
            width: size,
            height: size,
            top: head.top * size,
            left: head.left * size,
          }}
          className="bg-stone-900 absolute rounded-full "
        ></div>
      </div>
      </div>

      <div className="flex gap-5 mt-10 justify-center">
        <button
          onClick={() => setDirection("left")}
          className="bg-blue-100 rounded-sm py-2 px-8"
        >
          Left
        </button>
        <button
          onClick={() => setDirection("up")}
          className="bg-blue-100 rounded-sm py-2 px-8"
        >
          Up
        </button>
        <button
          onClick={() => setDirection("down")}
          className="bg-blue-100 rounded-sm py-2 px-8"
        >
          Down
        </button>
        <button
          onClick={() => setDirection("right")}
          className="bg-blue-100 rounded-sm py-2 px-8"
        >
          Right
        </button>
      </div>
    </div>
  );
}
