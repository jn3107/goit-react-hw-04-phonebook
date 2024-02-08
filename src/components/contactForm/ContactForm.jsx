import css from "./ContactForm.module.css";
import { Component } from "react";

export class ContactForm extends Component {
    state = {
        name: "",
        number: "",
    };

    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({
            name: this.state.name,
            number: this.state.number,
        });
        this.resetForm();
    };

    resetForm = () => {
        this.setState({ name: "", number: "" });
    };

    render() {
        return (
            <div>
                <form className={css.formWrapper} onSubmit={this.handleSubmit}>
                    <label className={css.label}>
                        Name
                        <input
                            className={css.input}
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            value={this.state.name}
                            onChange={this.handleChange}
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
                            value={this.state.number}
                            onChange={this.handleChange}
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
    }
};