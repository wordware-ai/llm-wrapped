import React from "react";
import WordwareCard from "./wordware-card";
import { cn } from "@/lib/utils";

const cards = [
  {
    content:
      "Your playlist screams'I learned about music from my mom's aerobics DVD collection.' You've got Madonna next to Zach Bryan - it's like putting caviar on a gas station hot dog.",
    bgColor: "bg-gradient-to-bl from-gray-800 via-emerald-950 to-slate-900",
  },
  {
    content:
      "The fact that you're listening to both 'Without Me' and 'My Heart Will Go On' suggests you're the kind of person who can't decide if they want to fight someone or dramatically stare out a rainy window.",
    bgColor: "bg-gradient-to-bl from-gray-800 via-rose-950 to-slate-900",
  },
  {
    content:
      "Your career is like a DJ Khaled song - you just keep saying 'Another one' while moving from job to job. At least you're consistent at being inconsistent!",
    bgColor: "bg-gradient-to-bl from-gray-800 via-indigo-950 to-slate-900",
  },
];

export default function HomeCards() {
  return (
    <div className="flex flex-col justify-center gap-8 md:flex-row">
      {cards.map((card) => (
        <WordwareCard
          key={card.content}
          className={cn("w-full sm:max-w-xs", card.bgColor)}
        >
          <div className="z-10 text-white">{card.content}</div>
        </WordwareCard>
      ))}
    </div>
  );
}
