import type { ReactNode } from "react";

export interface StoreWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    icon: ReactNode;
}
