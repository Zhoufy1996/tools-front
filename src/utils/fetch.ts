export const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const request = async <T>(url: string, config: RequestInit): Promise<T> => {
  let res;
  try {
    const headers: HeadersInit = {
      ...config.headers,
      'Content-Type': 'application/json',
    } as Record<string, any>;

    res = await fetch(`${baseUrl}${url}`, {
      ...config,
      headers,
    });
  } catch (e) {
    throw new Error(e as string);
  }
  const text = await res.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch (e) {
    result = text;
  }
  if (result.statusCode >= 400) {
    throw new Error(result.message);
  }
  return result;
};
