import Navbar from "./navbar";
import { SideCards } from "./side-cards";
import { UserInfo } from "./user-info";
import WordwareInfo from "./wordware-info";

export function ResultsPage({
  user,
  cards,
  LoadingState,
}: {
  user: {
    username: string;
    name: string;
    imageUrl: string;
    storyHref: string;
  };
  cards: {
    card1text: string;
    card2: {
      title?: string;
      text: string;
      imageUrl?: string;
      href?: string;
    };
    card3text: string;
    wordwareStoryHref: string;
    showWordwareCard: boolean;
  };
  LoadingState?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="mb-10 flex flex-col gap-12 p-8 lg:h-[calc(100vh-56px)] lg:flex-row lg:gap-4">
        {LoadingState ? LoadingState : <UserInfo {...user} />}
        <SideCards {...cards} />
      </div>

      <WordwareInfo />
    </div>
  );
}
