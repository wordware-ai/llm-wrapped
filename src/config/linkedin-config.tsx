import Image from "next/image";

type CardData = {
  id: string;
  title: string;
};

export type CardComponentProps = {
  result: Record<string, unknown>;
  profileData?: Record<string, string | null>;
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

const CurrentPosition = ({ result, profileData }: CardComponentProps) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-center text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        Current Position
      </p>
      {profileData?.currentPositionImageUrl && (
        <div className="my-2 flex justify-center">
          <Image
            src={profileData.currentPositionImageUrl}
            alt="Current Position"
            className="aspect-square rounded-lg object-cover"
            width={200}
            height={200}
          />
        </div>
      )}
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {result.value as string}
      </p>
    </div>
  );
};

const JsonMetricCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-center text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        {title}
      </p>
      <div className="text-[7vh] font-semibold italic leading-tight text-[#F8D4D7] sm:text-[6vh]">
        {String(value)}
      </div>
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {String(description)}
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
      <JsonMetricCard
        title="Ambition Level"
        value={result.ambition_score as string}
        description={result.description as string}
      />
    ),
  },
  {
    data: {
      id: "delusional",
      title: "Reality Check Rating",
    },
    Component: ({ result }) => (
      <JsonMetricCard
        title="Reality Check Rating"
        value={result.score as string}
        description={result.description as string}
      />
    ),
  },
  {
    data: {
      id: "performance",
      title: "Performance Rating",
    },
    Component: ({ result }) => (
      <JsonMetricCard
        title="Performance Rating"
        value={result.score as string}
        description={result.performance_review as string}
      />
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
