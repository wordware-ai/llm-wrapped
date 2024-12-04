import Image from "next/image";

type CardData = {
  id: string;
  title: string;
};

export type CardComponentProps = {
  result: Record<string, unknown>;
  imageUrl?: string;
};

export type CardItem = {
  data: CardData;
  Component?: React.ComponentType<CardComponentProps>;
};

const Recommendation = ({ result }: CardComponentProps) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[4vh] text-center sm:gap-[3vh]">
      <h3 className="text-[4.5vh] font-semibold leading-tight text-white sm:text-[3.5vh]">
        Recommendation
      </h3>
      <p className="text-[4vh] leading-tight text-white sm:text-[3vh]">
        {String(result.value)}
      </p>
    </div>
  );
};

const CurrentPosition = ({ result }: CardComponentProps) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-center text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        Current Position
      </p>
      <p className="text-[4vh] leading-tight sm:text-[3vh]">{String(result)}</p>
    </div>
  );
};

const JsonMetricCard = ({
  result,
  title,
}: CardComponentProps & { title: string }) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-center text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        {title}
      </p>
      <div className="text-[7vh] font-semibold italic leading-tight text-[#F8D4D7] sm:text-[6vh]">
        {String(result.level)}
      </div>
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {String(result.description)}
      </p>
    </div>
  );
};

export const linkedinConfig: CardItem[] = [
  {
    data: {
      id: "short_summary",
      title: "Summary",
    },
  },
  {
    data: {
      id: "current_position",
      title: "Current Position",
    },
    Component: CurrentPosition,
  },
  {
    data: {
      id: "actual_position",
      title: "Actual Position",
    },
  },
  {
    data: {
      id: "position_mother",
      title: "What Your Mother Thinks You Do",
    },
  },
  {
    data: {
      id: "accidental_success",
      title: "Accidental Success Story",
    },
  },
  {
    data: {
      id: "ambition",
      title: "Ambition Level",
    },
    Component: ({ result }) => (
      <JsonMetricCard result={result} title="Ambition Level" />
    ),
  },
  {
    data: {
      id: "delusional",
      title: "Reality Check Rating",
    },
    Component: ({ result }) => (
      <JsonMetricCard result={result} title="Reality Check Rating" />
    ),
  },
  {
    data: {
      id: "performance",
      title: "Performance Rating",
    },
    Component: ({ result }) => (
      <JsonMetricCard result={result} title="Performance Rating" />
    ),
  },
  {
    data: {
      id: "career_trajectory",
      title: "Career Trajectory",
    },
  },
  {
    data: {
      id: "next_endeavor",
      title: "Next Bold Endeavor",
    },
  },
  {
    data: {
      id: "job_description",
      title: "Job Description Translation",
    },
  },
  {
    data: {
      id: "buzzword_bingo",
      title: "Buzzword Bingo",
    },
  },
  {
    data: {
      id: "skills",
      title: "Skills (Allegedly)",
    },
  },
  {
    data: {
      id: "reason_for_firing",
      title: "Potential Reason for Firing",
    },
  },
  {
    data: {
      id: "recommendation",
      title: "Career Advice",
    },
    Component: Recommendation,
  },
];
