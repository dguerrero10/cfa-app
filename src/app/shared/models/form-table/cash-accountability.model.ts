export interface CashAccountability {
    leaderFirstName: string;
    leaderLastName: string;
    teamMemberFirstName: string;
    teamMemberLastName: string;
    shortageOverage: string;
    amountMissing: number;
    mixedDrawer: string;
    mixedDrawerTeamMemberFirstName?: string;
    mixedDrawerTeamMemberLastName?: string
    notes: string;
}