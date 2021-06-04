export interface Care {
    date: Date;
    guestName?: string;
    guestPhoneNumber?: number;
    category: string;
    issue: string;
    otherExplanation?: string;
    modeOfVisit: string;
    teamMemberPosition?: string;
    leaderName: string;
}