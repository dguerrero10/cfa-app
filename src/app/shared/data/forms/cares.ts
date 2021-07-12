import { Select } from '../../models/interfaces/select.interface'

export const MODES_OF_VISIT: Select[] = [
    {
        value: 'Curb_side',
        name: 'Curb Side'
    },
    {
        value: 'Drive_through',
        name: 'Drive through'
    },
    {
        value: 'Dine_in',
        name: 'Dine in'
    },
    {
        value: 'Carry_out',
        name: 'Carry Out'
    },
    {
        value: 'Delivery',
        name: 'Delivery'
    }
];

export const CATEGORIES: Select[] = [
    {
        value: 'Food_quality',
        name: 'Food quality'
    },
    {
        value: 'Team_member_issue',
        name: 'Team member issue'
    },
    {
        value: 'Missing_items',
        name: 'Missing items'
    },
    {
        value: 'Wrong_item',
        name: 'Wrong item'
    },
    {
        value: 'Other',
        name: 'Other'
    }
];

export const FOOD_QUALITY: Select[] = [
    {
        value: 'Food_cold',
        name: 'Food cold'
    },
    {
        value: 'Food_undercooked',
        name: 'Food undercooked'
    },
    {
        value: 'Food_overcooked',
        name: 'Food overcooked'
    },
    {
        value: 'Poor_taste',
        name: 'Poor taste'
    },
    {
        value: 'Poorly_packaged',
        name: 'Poorly packaged'
    },
    {
        value: 'Other',
        name: 'Other'
    }
];

export const SERVICES: Select[] = [
    {
        value: 'Bad_customer_interaction',
        name: 'Bad customer interaction'
    },
    {
        value: 'Order_wrong',
        name: 'Order wrong'
    },
    {
        value: 'Slow_service',
        name: 'Slow service'
    },
    {
        value: 'Other',
        name: 'Other'
    }
];

export const MISSING_ITEMS: Select[] = [
    {
        value: 'Entree',
        name: 'Entree(s)'
    },
    {
        value: 'Drink',
        name: 'Drink(s)'
    },
    {
        value: 'Side',
        name: 'Side(s)'
    },
    {
        value: 'Fries',
        name: 'Fries'
    },
    {
        value: 'Napkins',
        name: 'Napkins'
    },
    {
        value: 'Sauces',
        name: 'Sauces'
    },
    {
        value: 'Other',
        name: 'Other'
    }
];