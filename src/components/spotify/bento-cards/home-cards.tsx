import React from "react";
import WordwareCard from "./wordware-card";

const cards = [
  "Your playlist screams'I learned about music from my mom's aerobics DVD collection.' You've got Madonna next to Zach Bryan - it's like putting caviar on a gas station hot dog. ",
  "The fact that you're listening to both 'Without Me' and 'My Heart Will Go On' suggests you're the kind of person who can't decide if they want to fight someone or dramatically stare out a rainy window.",
  "Your career is like a DJ Khaled song - you just keep saying 'Another one' while moving from job to job. At least you're consistent at being inconsistent!",
];
export default function HomeCards() {
  return (
    <div className="flex justify-center gap-8">
      {cards.map((card) => (
        <WordwareCard key={card} content={card} />
      ))}
    </div>
  );
}
