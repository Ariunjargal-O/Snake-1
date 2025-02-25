"use client";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

const size = 15;

const board = {
  width: 30,
  height: 30,
};

export default function Home() {
  const [head, setHead] = useState({
    top: 50,
    left: 50,
  });

  useInterval(() => {
    setHead({ top: head.top, left: head.left + 1 });
  }, 50);

  return (
    <div>
      <header className="text-center mt-10 text-[50px]">
        Welcome to Snake by Ari
      </header>
      <div
        style={{ width: board.width * size, height: board.height * size }}
        className="bg-pink-300 relative mx-auto mt-20 border-2 border-black"
      >
        <div
          style={{ width: size, height: size, top:head.top, left: head.left }}
          className="bg-stone-900 absolute rounded-full "
        ></div>
      </div>
    </div>
  );
}
