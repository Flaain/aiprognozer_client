export type Screens = Array<ScreenObject>;

export type ScreenObject = Omit<Screen, 'data'> & { default?: boolean }

export interface Screen {
    name: string;
    element: React.ReactNode;
    data?: any;
}

export interface ChangeScreenOptions {
    data?: any;
}

export interface ScreenContextProps {
    currentScreen: Screen;
    changeScreen: (name: string, options?: ChangeScreenOptions) => void;
}