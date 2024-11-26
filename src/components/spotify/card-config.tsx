import MusicTasteAnalysisBentoCard from "./bento-cards/music-taste-analysis";
import IdentityCrisisLevelBentoCard from "./bento-cards/identity-crisis-level";
import TimeMachineStatusBentoCard from "./bento-cards/time-machine-status";
import DanceFloorCredibilityBentoCard from "./bento-cards/dance-floor-credibility";
import AchievementUnlockedBentoCard from "./bento-cards/achievement-unlocked";
import EmotionalStabilityBentoCard from "./bento-cards/emotional-stability";
import GeographicConfusionBentoCard from "./bento-cards/geographic-confusion";
import GuiltyPleasureSongBentoCard from "./bento-cards/guilty-pleasure-song";
import SongsYouThinkAreAboutYouBentoCard from "./bento-cards/songs-you-think-are-about-you";
import LyricTherapistNeededBentoCard from "./bento-cards/lyric-therapist-needed";
import FinalDiagnosisBentoCard from "./bento-cards/final-diagnosis";
import RecommendationBentoCard from "./bento-cards/recommendation";

// Import story cards here when they're created
// import MusicTasteAnalysisStoryCard from "./story-cards/music-taste-analysis";
// etc...

// Add this interface for the bento card props
interface BentoCardProps {
  content: string;
}

type CardConfig = {
  id: string;
  title: string;
  bentoComponent: React.ComponentType<BentoCardProps>;
  storyComponent?: React.ComponentType<any>;
  gridConfig: {
    colSpan: number;
    rowSpan: number;
  };
  theme: {
    backgroundColor: string;
    textColor: string;
  };
};

export const cardConfigs: Record<string, CardConfig> = {
  musicTasteAnalysis: {
    id: "music-taste-analysis",
    title: "Music Taste Analysis",
    bentoComponent: MusicTasteAnalysisBentoCard,
    gridConfig: {
      colSpan: 6,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-blue-300",
      textColor: "text-blue-950",
    },
  },
  identityCrisis: {
    id: "identity-crisis",
    title: "Identity Crisis Level",
    bentoComponent: IdentityCrisisLevelBentoCard,
    gridConfig: {
      colSpan: 3,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-green-300",
      textColor: "text-green-950",
    },
  },
  timeMachineStatus: {
    id: "time-machine-status",
    title: "Time Machine Status",
    bentoComponent: TimeMachineStatusBentoCard,
    gridConfig: {
      colSpan: 3,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-purple-300",
      textColor: "text-purple-950",
    },
  },
  danceFloorCredibility: {
    id: "dance-floor-credibility",
    title: "Dance Floor Credibility",
    bentoComponent: DanceFloorCredibilityBentoCard,
    gridConfig: {
      colSpan: 4,
      rowSpan: 1,
    },
    theme: {
      backgroundColor: "bg-yellow-300",
      textColor: "text-yellow-950",
    },
  },
  achievementUnlocked: {
    id: "achievement-unlocked",
    title: "Achievement Unlocked",
    bentoComponent: AchievementUnlockedBentoCard,
    gridConfig: {
      colSpan: 4,
      rowSpan: 1,
    },
    theme: {
      backgroundColor: "bg-amber-300",
      textColor: "text-amber-950",
    },
  },
  emotionalStability: {
    id: "emotional-stability",
    title: "Emotional Stability Score",
    bentoComponent: EmotionalStabilityBentoCard,
    gridConfig: {
      colSpan: 4,
      rowSpan: 1,
    },
    theme: {
      backgroundColor: "bg-red-300",
      textColor: "text-red-950",
    },
  },
  geographicConfusion: {
    id: "geographic-confusion",
    title: "Geographic Confusion",
    bentoComponent: GeographicConfusionBentoCard,
    gridConfig: {
      colSpan: 3,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-teal-300",
      textColor: "text-teal-950",
    },
  },
  guiltyPleasureSong: {
    id: "guilty-pleasure-song",
    title: "Guilty Pleasure Song",
    bentoComponent: GuiltyPleasureSongBentoCard,
    gridConfig: {
      colSpan: 3,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-pink-300",
      textColor: "text-pink-950",
    },
  },
  songsYouThinkAreAboutYou: {
    id: "songs-you-think-are-about-you",
    title: "Songs You Think Are About You",
    bentoComponent: SongsYouThinkAreAboutYouBentoCard,
    gridConfig: {
      colSpan: 6,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-cyan-300",
      textColor: "text-cyan-950",
    },
  },
  lyricTherapistNeeded: {
    id: "lyric-therapist-needed",
    title: "Lyric Therapist Needed",
    bentoComponent: LyricTherapistNeededBentoCard,
    gridConfig: {
      colSpan: 3,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-rose-300",
      textColor: "text-rose-950",
    },
  },
  finalDiagnosis: {
    id: "final-diagnosis",
    title: "Final Diagnosis",
    bentoComponent: FinalDiagnosisBentoCard,
    gridConfig: {
      colSpan: 6,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-blue-300",
      textColor: "text-blue-950",
    },
  },
  recommendation: {
    id: "recommendation",
    title: "Recommendation",
    bentoComponent: RecommendationBentoCard,
    gridConfig: {
      colSpan: 3,
      rowSpan: 2,
    },
    theme: {
      backgroundColor: "bg-orange-300",
      textColor: "text-orange-950",
    },
  },
};

export type CardConfigKey = keyof typeof cardConfigs;
