import React from "react";
interface ServerIdLayoutProps {
  children: React.ReactNode;
}
const ServerLayout = ({ children }: ServerIdLayoutProps) => {
  return (
    <div className="h-full">
      <div className="flex h-full">{children}</div>
    </div>
  );
};

export default ServerLayout;
