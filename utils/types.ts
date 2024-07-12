export interface CardData {
    id: number;
    title: string;
    subtitle: string;
    imageSrc: string;
    selectBg: string;
    codeData: any;
};

export interface CopyableCodeProps {
    code: string;
};

export interface BackgroundSelectorProps {
    bg: string;
};

export interface CardComponentProps {
    data: CardData;
    setBg: (bg: string) => void;
    setCode: (code: any) => void;
};