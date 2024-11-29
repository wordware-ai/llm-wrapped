type ImageUrlMapping = {
  least_popular_artist: "least_popular_artist_image_url";
  most_popular_artist: "most_popular_artist_image_url";
  music_taste_analysis_1: "top_artist_image_url";
};

export function getImageUrl(
  currentSlideId: string,
  data: Record<string, unknown>,
): string | undefined {
  console.log(data);
  console.log(currentSlideId);
  console.log("hi");
  const imageUrlMap: ImageUrlMapping = {
    least_popular_artist: "least_popular_artist_image_url",
    most_popular_artist: "most_popular_artist_image_url",
    music_taste_analysis_1: "top_artist_image_url",
  };

  const mappedKey = imageUrlMap[currentSlideId as keyof ImageUrlMapping];
  return mappedKey ? (data[mappedKey] as string) : undefined;
}
