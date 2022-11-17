import { createSlice } from '@reduxjs/toolkit';

export const CONTACTS_SAMPLE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: CONTACTS_SAMPLE },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    setContacts(state, action) {
      state.contacts = [...action.payload];
    },
  },
});

export const { addContact, setContacts } = contactsSlice.actions;
