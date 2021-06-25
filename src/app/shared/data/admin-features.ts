import { Feature } from "../models/feature.model";

export let ADMIN_FEATURES: Feature[] = [
    {  
        matToolTip: "Home",
        feature: "./",
        icon: 'home',
        selected: true
    },
    {  
        matToolTip: "Manage Users",
        feature: "manage-users",
        icon: 'people',
        selected: false
    },
    {  
        matToolTip: "Manage Record Expirations",
        feature: "manage-record-expirations",
        icon: 'pending_actions',
        selected: false
    }
];