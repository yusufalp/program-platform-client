export default async function hasProfile(userId: string, token: string) {
  const url = `${import.meta.env.VITE_PROFILE_SERVICE_URL}/${userId}`;

  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await fetch(url, options);

  if (response.status === 404) return false;
  if (!response.ok) throw new Error("Failed to get user profile");

  return true;
}
