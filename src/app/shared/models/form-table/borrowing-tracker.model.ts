export interface BorrowingTracker {
    date: Date;
    itemBorrowed: string;
    amountOfItem: number;
    fromLocation: string;
    toLocation: string;
    notes?: string;
    leaderFirstName: string;
    leaderLastName: string;
}