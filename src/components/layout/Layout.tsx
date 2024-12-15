import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="min-h-screen w-full max-w-3xl rounded-lg bg-card p-6 shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
};
