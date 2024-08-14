// export const APP_HOST = "http://localhost:3000";
// export const APP_HOST = typeof window !== 'undefined' ? window.location.host : '';
export const APP_HOST = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
