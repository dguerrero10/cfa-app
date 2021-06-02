export interface TeamAttendance {
    date: Date;
    teamMemberName: string;
    issue: string;
    symptoms: string;
    notes?: string;
    leaderName: string;
}