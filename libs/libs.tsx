export async function getStory() {
  const response = await fetch("/api/hello", {
    method: "POST",
  });

  return response;
}
