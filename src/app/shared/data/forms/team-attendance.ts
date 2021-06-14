import { Select } from '../../models/interfaces/select.interface'

export const ISSUES: Select[] = [
  {
    value: 'Call_in_personal',
    name: 'Call in personal'
  },
  {
    value: 'Call_in_sick',
    name: 'Call in sick'
  },
  {
    value: 'Late_to_work',
    name: 'Late to work'
  },
  {
    value: 'No_call_no_show',
    name: 'No Call No Show'
  },
  {
    value: 'Uniform',
    name: 'Uniform'
  },
  {
    value: 'Did_not_call_in',
    name: 'Did not Call in'
  },
  {
    value: 'Other',
    name: 'Other'
  },
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