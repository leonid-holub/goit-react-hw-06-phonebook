import { useSelector, useDispatch } from 'react-redux';
import { addContact, setContacts } from '../redux/contactsSlice';

import { update } from '../redux/filterSlice';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacs';

export default function App() {
  const listOfContacts = useSelector(state => state.contacts.contacts);
  const dispatchContacts = useDispatch();
  const nameFilter = useSelector(state => state.filter.filter);
  const dispatchFilter = useDispatch();

  const addingContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    name.length !== 0 && listOfContacts.find(info => info.name === contact.name)
      ? alert(contact.name + 'is already in contacts')
      : dispatchContacts(addContact(contact));
  };

  const deletingContact = id => {
    dispatchContacts(setContacts(listOfContacts.filter(el => el.id !== id)));
  };

  const handleFindContacts = e => {
    const { value } = e.target;
    dispatchFilter(update(value));
  };
  const normilizeFilter = nameFilter.toLowerCase();
  const visibleContacts = listOfContacts.filter(contact =>
    contact.name.toLowerCase().includes(normilizeFilter)
  );

  return (
    <>
      <Section title="Phonebook">
        <Form onAddContact={addingContact} />
      </Section>
      <Section title="Contacts">
        <Contacts
          contactsArray={visibleContacts}
          findContacts={handleFindContacts}
          deleteContact={deletingContact}
        />
      </Section>
    </>
  );
}
