import { Feature } from "../models/feature.model";

export let FEATURES: Feature[] = [
    {  
        matToolTip: "Team Member Attendance",
        feature: "teamMemberAttendance",
        icon: 'groups',
        selected: true
    },
    {  
        matToolTip: "Cares",
        feature: "cares",
        icon: 'insert_emoticon',
        selected: false
    },
    {  
        matToolTip: "Item Order",
        feature: "itemOrder",
        icon: 'production_quantity_limits',
        selected: false
    },
    {  
        matToolTip: "Financial Services",
        feature: "financialServices",
        icon: 'request_quote',
        selected: false
    },
    {  
        matToolTip: "Borrowing Tracker",
        feature: "borrowingTracker",
        icon: 'local_shipping',
        selected: false
    },
];