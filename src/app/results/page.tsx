import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/server";
import { Music2 } from "lucide-react";
import Image from "next/image";

export default async function ResultsPage() {
  // Fetch all data concurrently
  const [topArtists, topTracks, profile, playlists, recentlyPlayed] =
    await Promise.all([
      api.spotify.getTopArtists(),
      api.spotify.getTopTracks(),
      api.spotify.getUserProfile(),
      api.spotify.getPlaylists(),
      api.spotify.getRecentlyPlayed(),
    ]);

  return (
    <div className="container mx-auto py-8">
      {/* Profile Section */}
      <div className="mb-8">
        <Card>
          <CardContent className="flex items-center gap-6 p-6">
            {profile.images?.[0] && (
              <Image
                src={profile.images[0].url}
                alt={profile.display_name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{profile.display_name}</h1>
              <p className="text-muted-foreground">
                {profile.followers.total.toLocaleString()} followers •{" "}
                {profile.country}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="artists" className="space-y-4">
        <TabsList>
          <TabsTrigger value="artists">Top Artists</TabsTrigger>
          <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="recent">Recently Played</TabsTrigger>
        </TabsList>

        {/* Top Artists Tab */}
        <TabsContent value="artists">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topArtists.items.map((artist) => (
              <Card key={artist.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  {artist.images?.[0] && (
                    <Image
                      src={artist.images[0].url}
                      alt={artist.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{artist.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {artist.followers.total.toLocaleString()} followers
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {artist.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="bg-primary/10 rounded-full px-2 py-1 text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Top Tracks Tab */}
        <TabsContent value="tracks">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {topTracks.items.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 border-b p-4 last:border-0"
                  >
                    <span className="text-muted-foreground w-6 text-center">
                      {index + 1}
                    </span>
                    {track.album.images?.[0] && (
                      <Image
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{track.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {track.album.name}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Playlists Tab */}
        <TabsContent value="playlists">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playlists.items.map((playlist) => (
              <Card key={playlist.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {playlist.images?.[0] ? (
                      <Image
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover"
                      />
                    ) : (
                      <div className="bg-primary/10 flex h-16 w-16 items-center justify-center">
                        <Music2 className="text-primary h-8 w-8" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{playlist.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {playlist.tracks.total} tracks
                      </p>
                      <p className="text-muted-foreground text-xs">
                        By {playlist.owner.display_name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recently Played Tab */}
        <TabsContent value="recent">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {recentlyPlayed.items.map((item) => (
                  <div
                    key={item.played_at}
                    className="flex items-center gap-4 border-b p-4 last:border-0"
                  >
                    {item.track.album.images?.[0] && (
                      <Image
                        src={item.track.album.images[0].url}
                        alt={item.track.album.name}
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.track.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.track.artists.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {new Date(item.played_at).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
