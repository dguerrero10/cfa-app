export interface TeamMemberAttendance {
    _id: string;
    firstName: string;
    lastName: string;
    workArea: string;
    issue: string;
    reportedSymptoms?: string;
    otherExplanation?: string;
    notes?: string;
    leaderFirstName: string;
    leaderLastName: string;
}