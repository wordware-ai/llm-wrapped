"use client";

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-4xl font-bold">{count}</p>
      <button
        onClick={handleClick}
        className="rounded-md bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        Click me!
      </button>
    </div>
  );
};

export default Counter;
