
export const queryString = (payload?: { [key: string]: string }) => {
    return payload
      ? '?' +
          Object.entries(payload)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&')
      : '';
  };