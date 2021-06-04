import { Select } from '../../models/interfaces/select.interface'

export const MODES_OF_VISIT: Select[] = [
    {
        value: 'dineIn',
        name: 'Dine in'
    },
    {
        value: 'driveThrough',
        name: 'Drive through'
    },
    {
        value: 'delivery',
        name: 'Delivery'
    }
];

export const CATEGORIES: Select[] = [
    {
        value: 'foodQuality',
        name: 'Food quality'
    },
    {
        value: 'service',
        name: 'Service'
    },
    {
        value: 'missingItems',
        name: 'Missing items'
    }
];

export const FOOD_QUALITY: Select[] = [
    {
        value: 'foodCold',
        name: 'Food cold'
    },
    {
        value: 'foodUndercooked',
        name: 'Food undercooked'
    },
    {
        value: 'foodOvercooked',
        name: 'Food overcooked'
    },
    {
        value: 'poorTaste',
        name: 'Poor taste'
    },
    {
        value: 'other',
        name: 'Other'
    }
];

export const SERVICES: Select[] = [
    {
        value: 'badCustomerInteraction',
        name: 'Bad customer interaction'
    },
    {
        value: 'orderWrong',
        name: 'Order wrong'
    },
    {
        value: 'slowService',
        name: 'Slow service'
    },
    {
        value: 'other',
        name: 'Other'
    }
];

export const MISSING_ITEMS: Select[] = [
    {
        value: 'drink',
        name: 'Drink(s)'
    },
    {
        value: 'entree',
        name: 'Entree(s)'
    },
    {
        value: 'fries',
        name: 'Fries'
    },
    {
        value: 'napkins',
        name: 'Napkins'
    },
    {
        value: 'sauces',
        name: 'Sauces'
    },
    {
        value: 'other',
        name: 'Other'
    }
];