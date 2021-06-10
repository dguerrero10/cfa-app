export interface TeamAttendance {
    _id: string;
    teamMemberName: string;
    issue: string;
    workArea: string;
    reportedSymptoms?: string;
    otherExplanation?: string;
    notes?: string;
    leaderName: string;
}