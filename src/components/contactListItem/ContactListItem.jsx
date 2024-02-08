import css from "./ContactListItem.module.css";

const ContactListItem = ({ id, name, number, onDeleteContact }) => {
    return (
        <div>
            <li className={css.item}>
                <span className={css.name}>{name}:</span>
                <span className={css.number}>{number}</span>
                <button
                    className={css.buttonDelete}
                    type="button"
                    onClick={() => onDeleteContact(id)}
                >
                    Delete
                </button>
            </li>
        </div>
    );
};

export { ContactListItem };