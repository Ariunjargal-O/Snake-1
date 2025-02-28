"use client";
import { use, useActionState, useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { useEventListener } from "usehooks-ts";
const size = 15;

const board = {
  width: 20,
  height: 20,
};

export default function Home() {
  const [head, setHead] = useState({
    top: 5,
    left: 4,
  });
  const [direction, setDirection] = useState("right");
  const [tails, setTails] = useState([
    {
      top: 5,
      left: 1,
    },
    {
      top: 5,
      left: 2,
    },
    {
      top: 5,
      left: 3,
    },
  ]);
  const [food, setFood] = useState({
    top: 4,
    left: 5,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [highscore, setHighScore] = useState(0)

  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     if (e.code === "Arrowup") {
  //       setDirection("up");
  //     }
  //     switch (e.code) {
  //       case "ArrowUp": {
  //         setDirection("up");
  //         break;
  //       }
  //       case "ArrowDown": {
  //         setDirection("down");
  //         break;
  //       }
  //       case "ArrowLeft": {
  //         setDirection("left");
  //         break;
  //       }
  //       case "ArrowRight": {
  //         setDirection("right");
  //         break;
  //       }
  //     }
  //   });
  // });
useEffect(() => {
  if(score > highscore){
    setHighScore(score);
    localStorage.setItem("snakeHighScore", score.toString())
  }
},[score])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Arrowup") {
        setDirection("up");
      }
      switch (e.code) {
        case "ArrowUp":
          if (direction !== "down") setDirection("up");
          break;
        case "ArrowDown":
          if (direction !== "up") setDirection("down");
          break;
        case "ArrowLeft":
          if (direction !== "right") setDirection("left");
          break;
        case "ArrowRight":
          if (direction !== "left") setDirection("right");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  function gameLoop() {
    let newLeft = head.left;
    let newTop = head.top;

    const newTails = [...tails];

    newTails.push(head);
    newTails.shift();
    setTails(newTails);

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

    if (head.top === food.top && head.left === food.left) {
      newTails.push(head);
      setTails(newTails);
      generateNewFood();
      setScore((prevScore) => prevScore + 1);
    }

    if (tails.find((tail) => tail.left === newLeft && tail.top === newTop)) {
      setGameOver(true);
      setSpeed(null);
    }
  }

  function generateNewFood() {
    const newFoodTop = getRandomInt(board.height);
    const newFoodLeft = getRandomInt(board.width);
    setFood({ top: newFoodTop, left: newFoodLeft });
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useInterval(() => {
    gameLoop();
  }, speed);

  function restartGame() {
    setHead({ top: 5, left: 4 });
    setDirection("right");
    setTails([
      { top: 5, left: 1 },
      { top: 5, left: 2 },
      { top: 5, left: 3 },
    ]);
    setFood({ top: 4, left: 5 });
    setGameOver(false);
    setSpeed(100);
    setScore(0); // Reset score
  }

  function resetHighScore() {
    localStorage.removeItem("snakeHighScore");
    setHighScore(score);
  }

  return (
    <div>
      <header className="text-center mt-10 text-[50px]">
        Welcome to Snake
      </header>

      {gameOver && (
        <div className="mt-3 text-center">
          <p className="text-2xl font-bold text-red-600">GAME OVER!</p>
          <button
            onClick={restartGame}
            className="bg-red-200 rounded-sm py-2 px-8 mt-3 text-red-700 mb-1 "
          >
            Restart
          </button>
        </div>
      )}

      <div>
      <h1 className="text-center mt-4 text-[30px] font-bold text-red-700 ">
          HIGHSCORE: <span className="font-bold text-[30px] text-red-900">{highscore}</span>
        </h1>
        <h1 className="text-center mt-2 text-[20px] mb-3">
          SCORE: <span className="font-bold text-[25px]">{score}</span>
        </h1>
        {}
      </div>
      <div>
        <div
          style={{
            width: board.width * size + size,
            height: board.height * size + size,
          }}
          className="border-4 border-black border-double flex justify-center items-center mx-auto"
        >
          <div
            style={{ width: board.width * size, height: board.height * size }}
            className="bg-violet-100 relative  "
          >
            <div
              style={{
                width: size,
                height: size,
                top: food.top * size,
                left: food.left * size,
              }}
              className="bg-red-600 absolute rounded-full "
            ></div>
            <div
              style={{
                width: size,
                height: size,
                top: head.top * size,
                left: head.left * size,
              }}
              className="bg-green-700 absolute flex rounded-sm "
            >
              <div className="flex gap-1">
                <div className="flex justify-center gap-1 flex-col ml-[2px] ">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
            {tails.map((tail, index) => (
              <div
                key={`${tail.left}-${tail.top}-${index}`}
                style={{
                  width: size,
                  height: size,
                  top: tail.top * size,
                  left: tail.left * size,
                }}
                className="bg-green-500 absolute "
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6 justify-center mt-10">
        <button
          onClick={() => setDisplayButton(!displayButton)}
          className="bg-blue-300 rounded-sm py-2 px-8 flex justify-self-center mt-2"
        >
          Display Button
        </button>
      </div>
      {displayButton && (
        <div className=" mt-8">
          <button
            onClick={() => setDirection("up")}
            className="bg-blue-100 rounded-sm py-2 px-8 flex justify-self-center "
          >
            Up
          </button>

          <div className="flex gap-32 justify-self-center mt-2">
            <button
              onClick={() => setDirection("left")}
              className="bg-blue-100 rounded-sm py-2 px-8 "
            >
              Left
            </button>
            <button
              onClick={() => setDirection("right")}
              className="bg-blue-100 rounded-sm py-2 px-7"
            >
              Right
            </button>
          </div>

          <button
            onClick={() => setDirection("down")}
            className="bg-blue-100 rounded-sm py-2 px-5 flex justify-self-center mt-2"
          >
            Down
          </button>
        </div>
      )}
    </div>
  );
}
