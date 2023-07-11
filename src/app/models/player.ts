import { Competition } from "./competition";
import { SimpleTeam } from "./team";

export interface SearchPlayer {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    birthDate: Date;
    team: SimpleTeam;
}

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    detailPosition: string;
    birthDate: Date;
    team: SimpleTeam;
    shirtNumber: number;
    birthPlace: string;
    citizenship: string;
}

export interface PlayerStats {
    appearances: number;
    starting: number;
    goals: number;
    yellowCards: number;
    redCards: number;
    minutes: number;
}

export interface PlayerSeasonStats {
    competition: Competition;
    stats: PlayerStats;
}

export interface PlayerSeasonMatch {
    id: number;
    round: number;
    dateTime: Date;
    venue: string;
    team: SimpleTeam;
    opponent: SimpleTeam;
    resultStr: string;
    resultType: string;
    goals: number;
    yellowCard?: PlayerSeasonMatchEvent;
    redCard?: PlayerSeasonMatchEvent;
    minutes: number;
}

export interface PlayerSeasonMatchEvent {
    minute: number;
    additionalTimeMinute: number;
}