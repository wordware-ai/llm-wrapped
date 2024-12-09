import Image from "next/image";
import Link from "next/link";
import { PiUser } from "react-icons/pi";
import { api } from "@/trpc/server";

import { Card, CardContent } from "@/components/ui/card";
import { type MostVisitedData } from "@/lib/posthog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaSpotify, FaLinkedin } from "react-icons/fa";

type BaseUser = {
  id: string;
  username: string | null;
  imageUrl: string | null;
};

type SpotifyUser = BaseUser & {
  type: "spotify";
  // Add other Spotify-specific fields if needed
};

type LinkedInUser = BaseUser & {
  type: "linkedin";
  name: string | null;
  // Add other LinkedIn-specific fields if needed
};

type PlatformUser = SpotifyUser | LinkedInUser;

const MostVisited = async ({
  mostVisited,
}: {
  mostVisited: MostVisitedData;
}) => {
  // Split usernames by platform
  const spotifyUsernames = mostVisited.spotify
    .map(({ name }) => name)
    .filter((name): name is string => name !== null);
  const linkedinUsernames = mostVisited.linkedin
    .map(({ name }) => name)
    .filter((name): name is string => name !== null);

  // Fetch all users data in parallel, using the separated usernames
  const [spotifyUsers, linkedinUsers] = await Promise.all([
    api.spotifyResults.getByUsernames({ usernames: spotifyUsernames }),
    api.linkedinResults.getByUsernames({ usernames: linkedinUsernames }),
  ]);

  // Create maps for quick user lookups with proper typing
  const spotifyUserMap = new Map(
    spotifyUsers.map((user) => [
      user.username ?? "",
      { ...user, type: "spotify" } as SpotifyUser,
    ]),
  );
  const linkedinUserMap = new Map(
    linkedinUsers.map((user) => [
      user.username ?? "",
      { ...user, type: "linkedin" } as LinkedInUser,
    ]),
  );

  const renderUserList = (
    users: { name: string; visits: number }[],
    userMap: Map<string, PlatformUser>,
    platform: "spotify" | "linkedin",
  ) => (
    <ul className="space-y-4">
      {users.slice(0, 50).map(({ name, visits }, index) => {
        const user = userMap.get(name);
        if (!user?.username) return null;

        const profilePath = `/${platform}/${user.username}`;

        return (
          <li
            key={name}
            className="flex items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <div className="w-8 text-lg font-semibold text-gray-500">
              #{index + 1}
            </div>
            <div className="relative h-12 w-12">
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={`${platform === "linkedin" ? user.username : `@${user.username}`}'s profile picture`}
                  width={48}
                  height={48}
                  className="z-10 rounded-full"
                />
              ) : (
                <PiUser className="h-12 w-12 rounded-full bg-gray-100 p-2 text-gray-400" />
              )}
            </div>
            <div className="flex-grow">
              <Link
                href={profilePath}
                className="font-medium text-gray-900 hover:underline"
              >
                {platform === "linkedin"
                  ? ((user as LinkedInUser).name ?? user.username)
                  : `@${user.username}`}
              </Link>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
              {visits} visits
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <Card className="w-full">
      <Tabs defaultValue="spotify" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="spotify" className="space-x-2">
            <FaSpotify className="h-4 w-4" />
            <span>Spotify</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="space-x-2">
            <FaLinkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </TabsTrigger>
        </TabsList>
        <CardContent className="pt-6">
          <TabsContent value="spotify">
            {renderUserList(
              mostVisited.spotify.filter(
                (item): item is { name: string; visits: number } =>
                  typeof item.name === "string",
              ),
              spotifyUserMap,
              "spotify",
            )}
          </TabsContent>
          <TabsContent value="linkedin">
            {renderUserList(
              mostVisited.linkedin.filter(
                (item): item is { name: string; visits: number } =>
                  typeof item.name === "string",
              ),
              linkedinUserMap,
              "linkedin",
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MostVisited;
