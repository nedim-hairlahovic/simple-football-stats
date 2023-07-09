export interface Competition {
    id: number;
    name: string;
    rank: number;
    ageCategory: string;
}

export interface CompetitionRequest {
    name: string;
    rank: number;
    ageCategory: string;
}

export interface AgeCategory {
    key: string;
    name: string;
}