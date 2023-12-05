export default interface User {
    id: string;
    firstName: string;
    lastName: string;
    lastMatched: string | null;
    isAvailableToday: boolean;
    matchId: string | null;
}