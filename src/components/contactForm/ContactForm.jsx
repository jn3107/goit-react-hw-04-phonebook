import css from "./ContactForm.module.css";
import { useState } from "react";

export const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({ name, number });
        setName("");
        setNumber("");
    };

    return (
        <div>
            <form className={css.formWrapper} onSubmit={handleSubmit}>
                <label className={css.label}>
                    Name
                    <input
                        className={css.input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className={css.label}>
                    Number
                    <input
                        className={css.input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        value={number}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className={css.buttonAdd}
                    type="submit">
                    Add contact
                </button>
            </form>
        </div>
    );
};