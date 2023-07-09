import { SimpleTeam } from "./team";

export interface DuplicatePlayer {
    fullName: string;
    players: DuplicatePlayerInfo[];
}

export interface DuplicatePlayerInfo {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    team: SimpleTeam;
    lastMatchDate: Date;
}
