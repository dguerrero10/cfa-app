import { Feature } from "../models/feature.model";

export let FEATURES: Feature[] = [
    {  
        matToolTip: "Home",
        feature: "./",
        icon: 'home',
        selected: true
    },
    {  
        matToolTip: "Team Member Attendance",
        feature: "team-attendance",
        icon: 'groups',
        selected: false
    },
    {  
        matToolTip: "Cares",
        feature: "cares",
        icon: 'insert_emoticon',
        selected: false
    },
    {  
        matToolTip: "Item Order",
        feature: "item-order",
        icon: 'production_quantity_limits',
        selected: false
    },
    {  
        matToolTip: "Financial Services",
        feature: "financial-services",
        icon: 'request_quote',
        selected: false
    },
    {  
        matToolTip: "Borrowing Tracker",
        feature: "borrowing-tracker",
        icon: 'local_shipping',
        selected: false
    },
    {  
        matToolTip: "Cash Accountability",
        feature: "cash-accountability",
        icon: 'money_off',
        selected: false
    },
];
