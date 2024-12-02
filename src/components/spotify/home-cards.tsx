import React from "react";
import WordwareCard from "./wordware-card";
import { cn } from "@/lib/utils";

const cards = [
  "Your playlist screams'I learned about music from my mom's aerobics DVD collection.' You've got Madonna next to Zach Bryan - it's like putting caviar on a gas station hot dog.",
  "The fact that you're listening to both 'Without Me' and 'My Heart Will Go On' suggests you're the kind of person who can't decide if they want to fight someone or dramatically stare out a rainy window.",
  "Your career is like a DJ Khaled song - you just keep saying 'Another one' while moving from job to job. At least you're consistent at being inconsistent!",
  "You'd probably try to mosh to 'This Charming Man' while attempting to hit the griddy to The Smiths. Please stay at least 100 feet away from any dance floor",
];

export default function HomeCards() {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 xl:px-16">
      {cards.map((content) => (
        <WordwareCard key={content} className={cn("w-full")} hideShare>
          <div className="z-10 self-start text-2xl text-white">{content}</div>
        </WordwareCard>
      ))}
    </div>
  );
}
