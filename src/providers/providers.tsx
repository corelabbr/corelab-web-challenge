import StoreNotesProvider from '@/contexts/StoreNotesProviders';
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StoreNotesProvider>{children}</StoreNotesProvider>;
};
