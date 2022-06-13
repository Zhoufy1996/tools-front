export const fetcher = async <T>(url: string, config: RequestInit) => {
  const res = await fetch(url, config);
  const result = await res.json();
  if (res.status >= 400) {
    throw new Error(result.message);
  }

  return result as T;
};
