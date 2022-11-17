import { useState, useEffect, useMemo } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacs';
import { nanoid } from 'nanoid';

export default function App() {
  const CONTACTS_SAMPLE = useMemo(() => {
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  }, []);

  const [contacts, setContacts] = useState(CONTACTS_SAMPLE);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fromLocalContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(fromLocalContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useMemo(() => {
    if (contacts === CONTACTS_SAMPLE) {
      return;
    }
    const toLocalContacts = JSON.stringify(contacts);
    return localStorage.setItem('contacts', toLocalContacts);
  }, [contacts, CONTACTS_SAMPLE]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    name.length !== 0 &&
      (contacts.find(info => info.name === contact.name)
        ? alert(contact.name + 'is already in contacts')
        : setContacts(() => [contact, ...contacts]));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(el => el.id !== id));
  };

  const handleFindContacts = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const normilizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normilizeFilter)
  );

  return (
    <>
      <Section title="Phonebook">
        <Form onAddContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Contacts
          contactsArray={visibleContacts}
          findContacts={handleFindContacts}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
}
