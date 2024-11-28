import React from "react";

export default function InfoCards() {
  const cards = [
    {
      title: "Word... what?",
      content: {
        sections: [
          {
            heading: "WORDWARE",
            text: "It's a tool (an IDE) that enables you to quickly build custom AI agents for specific use cases like legal, marketing, construction, or even generating your own version of Wrapped as seen here. We call applications built on Wordware 'WordApps' because you can create them using natural language—in other words, using words (pun intended).",
          },
          {
            heading: "WHO IS IT FOR",
            text: "Most of our clients are cross-functional teams, including less technical members, who need to collaborate with engineers on LLM applications, such as assessing prompt outputs, and care about the speed of iterations.",
          },
          {
            heading: "WHY",
            text: "Often, the domain expert—not the engineer—knows what good LLM output looks like. For example, lawyers building legal SaaS need to be deeply involved in the process, and working directly in the codebase or going back-and-forth with engineers isn't the way to go.",
          },
        ],
      },
      bgColor: "bg-[#0F1511]",
      textColor: "text-white",
    },
    {
      title: "I'm technical",
      content: {
        text: "Then you'll appreciate the speed of building complex AI agents without messy LLM abstractions, as well as our advanced capabilities like loops, conditional logic (IF-Else), structured generation (JSON mode), and custom code execution, allowing you to connect to virtually any API.",
      },
      bgColor: "bg-gradient-to-r from-pink-200/40 to-cyan-200/40",
      textColor: "text-gray-800",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-3xl ${card.bgColor} p-8 ${card.textColor}`}
        >
          <h2 className="mb-6 text-4xl font-bold">{card.title}</h2>

          {"sections" in card.content ? (
            // First card with sections
            <div className="space-y-6">
              {card.content.sections?.map((section, idx) => (
                <div key={idx}>
                  <h3 className="mb-2 text-sm font-semibold tracking-wider">
                    {section.heading}
                  </h3>
                  <p className="text-sm/relaxed opacity-90">{section.text}</p>
                </div>
              ))}
            </div>
          ) : (
            // Second card with single text
            <p className="text-lg/relaxed">{card.content.text}</p>
          )}
        </div>
      ))}
    </div>
  );
}
