type ImageUrlMapping = {
  least_popular_artist: "least_popular_artist_image_url";
  most_popular_artist: "most_popular_artist_image_url";
  music_taste_analysis_1: "top_artist_image_url";
};

export function getImageUrl(
  imageId: string,
  data: Record<string, unknown>,
): string | undefined {
  const imageUrlMap: ImageUrlMapping = {
    least_popular_artist: "least_popular_artist_image_url",
    most_popular_artist: "most_popular_artist_image_url",
    music_taste_analysis_1: "top_artist_image_url",
  };

  const mappedKey = imageUrlMap[imageId as keyof ImageUrlMapping];
  const value = mappedKey ? (data[mappedKey] as string) : undefined;
  return value === "null" ? undefined : value;
}
