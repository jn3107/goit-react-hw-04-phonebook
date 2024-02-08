import { Component } from "react";
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

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  
  componentDidMount() {
    const newContact = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(newContact);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  createNewContact = data => {
    const { contacts } = this.state;
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
    this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };

  deleteContact = deleteId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== deleteId),
      };
    });
  };

  handleChangeFilter = event => {
    const value = event.currentTarget.value.toLowerCase();
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filterContacts = this.filterContacts();
    return (
      <div className={css.container}>
        <NotificationContainer />

        <SectionTitle
          title="Phonebook"
        />

        <ContactForm
          onSubmit={this.createNewContact}
        />

        <SectionSubtitle
          subtitle="Contacts"
        />

        <Filter
          value={this.state.filter}
          onFilterChange={this.handleChangeFilter}
        />

        <ContactList
          filteredContacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
};