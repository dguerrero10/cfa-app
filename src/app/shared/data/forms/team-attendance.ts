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
    value: 'Throwing_up',
    name: 'Throwing up'
  },
  {
    value: 'Sore_throat',
    name: 'Sore throat'
  },
  {
    value: 'Fever',
    name: 'Fever'
  },
  {
    value: 'Headache',
    name: 'Headache'
  },
  {
    value: 'Coughing',
    name: 'Coughing'
  },
  {
    value: 'Body_aches',
    name: 'Body aches'
  },
  {
    value: 'Diarrhea',
    name: 'Diarrhea'
  },
  {
    value: 'Stomach_pain',
    name: 'Stomach pain'
  },
  {
    value: 'Other',
    name: 'Other'
  }
];