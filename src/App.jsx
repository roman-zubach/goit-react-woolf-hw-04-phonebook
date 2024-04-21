import { useState, useEffect } from 'react';
import { ContactForm, ContactList, Filter, Section } from './components';
import { nanoid } from 'nanoid';
import { contactsStorage } from './storage/contactsStorage';

const App = () => {
  const [contacts, setContacts] = useState(contactsStorage.get());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contactsStorage.set(contacts);
  }, [contacts]);

  const addContact = (contact) => {
    setContacts((prevContacts) => [{ id: nanoid(), ...contact }, ...prevContacts]);
  };

  const removeContact = (removeId) => {
    setContacts((prevContacts) => prevContacts.filter(({ id }) => id !== removeId));
  };

  const isNameExist = (newName) => {
    return contacts.some(({ name }) => name.toLowerCase() === newName.toLowerCase());
  };

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filteredContacts = filter
    ? contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
    : contacts;

  return (
    <div>
      <Section>
        <h1>Phonebook</h1>
        <ContactForm save={addContact} isNameExist={isNameExist} />
      </Section>

      <Section>
        <h2>Contacts</h2>
        <Filter onChange={updateFilter} />
        <ContactList contacts={filteredContacts} handleRemove={removeContact} />
      </Section>
    </div>
  );
};

export default App;
