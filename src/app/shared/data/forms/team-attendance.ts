import { Select } from '../../models/interfaces/select.interface'

export const ISSUES: Select[] = [
  {
    value: 'sick',
    name: 'Sick'
  },
  {
    value: 'personalReasons',
    name: 'Personal reasons'
  },
  {
    value: 'emergency',
    name: 'Emergency'
  },
  {
    value: 'other',
    name: 'Other'
  }
];

export const SYMPTOMS: Select[] = [
  {
    value: 'throwingUp',
    name: 'Throwing up'
  },
  {
    value: 'soreThroat',
    name: 'Sore throat'
  },
  {
    value: 'fever',
    name: 'Fever'
  },
  {
    value: 'headache',
    name: 'Headache'
  },
  {
    value: 'coughing',
    name: 'Coughing'
  },
  {
    value: 'bodyAches',
    name: 'Body aches'
  },
  {
    value: 'diarrhea',
    name: 'Diarrhea'
  },
  {
    value: 'stomachPain',
    name: 'Stomach pain'
  },
];