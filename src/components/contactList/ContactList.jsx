import { ContactListItem } from "../contactListItem/ContactListItem";
import css from "./ContactList.module.css";

const ContactList = ({ filteredContacts, onDeleteContact }) => {
    return (
        <div>
            <ul className={css.contactList}>
                {filteredContacts.map(({ id, name, number }) => (
                    <ContactListItem
                        key={id}
                        id={id}
                        name={name}
                        number={number}
                        onDeleteContact={onDeleteContact}
                    />
                ))}
            </ul>
        </div>
    );
};

export { ContactList };