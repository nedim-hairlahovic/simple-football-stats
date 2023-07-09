import { SimpleTeam } from "./team";

export interface SearchPlayer {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    birthDate: Date;
    team: SimpleTeam;
}