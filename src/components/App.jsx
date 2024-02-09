import { ContactForm } from "./contactForm/ContactForm";
import { ContactList } from "./contactList/ContactList";
import { Filter } from "./filter/Filter";
import { SectionSubtitle } from "./sectionSubtitle/SectionSubtitle";
import { SectionTitle } from "./sectionTitle/SectionTitle";
import { nanoid } from 'nanoid';
import css from "./App.module.css";
import { NotificationContainer } from 'react-notifications';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useEffect, useState } from "react";

export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem("contacts")) ?? []);
  const [filter, setFilter] = useState("");

  useEffect(() => { localStorage.setItem("contacts", JSON.stringify(contacts)) }, [contacts]);
  
  const createNewContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };
    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (contactExists) {
      NotificationManager.info(`${data.name} is already in contacts.`);
      return;
    }
    setContacts(prevStateContacts => [newContact, ...prevStateContacts]);
  };

  const deleteContact = deleteId => {
    setContacts(prevStateContacts => prevStateContacts.filter(contact => contact.id !== deleteId));
  };

  const handleChangeFilter = event => {
    const value = event.currentTarget.value.toLowerCase();
    setFilter(value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.container}>
      <NotificationContainer />

      <SectionTitle
        title="Phonebook"
      />

      <ContactForm
        onSubmit={createNewContact}
      />

      <SectionSubtitle
        subtitle="Contacts"
      />

      <Filter
        value={filter}
        onFilterChange={handleChangeFilter}
      />

      <ContactList
        filteredContacts={filterContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};