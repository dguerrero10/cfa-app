import { Feature } from "../models/feature.model";

export let ADMIN_FEATURES: Feature[] = [
    {  
        matToolTip: "Manage Users",
        feature: "manageUsers",
        icon: 'people',
        selected: true
    },
    {  
        matToolTip: "Manage Record Expiration",
        feature: "manageRecordExpiration",
        icon: 'pending_actions',
        selected: false
    }
];