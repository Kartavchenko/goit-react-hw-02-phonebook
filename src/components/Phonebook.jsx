import { Component } from 'react';
import { FormContact } from './FromContact';
import { ListContacts } from './ListContacts';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    if (this.checkContact(contact)) {
      return alert(`${contact.name} ${contact.number} alredy in contacts list`);
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(prev => {
      const newContact = prev.contacts.filter(item => item.id !== id);
      return {
        contacts: newContact,
      };
    });
  };

  checkContact = ({ name, number }) => {
    const { contacts } = this.state;
    const result = contacts.find(
      item => item.name === name && item.number === number
    );
    return result;
  };

  handleSearch = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    const tolowerCase = filter.toLocaleLowerCase();
    const filterContact = contacts.filter(({ name, number }) => {
      const normalizeName = name.toLocaleLowerCase();
      const normalizeNamber = number.toLocaleLowerCase();
      const result =
        normalizeName.includes(tolowerCase) ||
        normalizeNamber.includes(tolowerCase);
      return result;
    });
    return filterContact;
  };

  render() {
    const contacts = this.filterContact();
    return (
      <div
        style={{
          marginLeft: '50px',
          marginTop: '50px',
        }}
      >
        <h1>Phonebook</h1>
        <FormContact addContact={this.addContact} />
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          Find contact by name
          <input
            style={{
              width: '200px',
              marginTop: '5px',
            }}
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.handleSearch}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <h2>Contacts</h2>
        <ul>
          <ListContacts
            contacts={contacts}
            removeContact={this.removeContact}
          />
        </ul>
      </div>
    );
  }
}

Phonebook.propTypes = {
  addContact: PropTypes.func,
  removeContact: PropTypes.func,
  checkContact: PropTypes.func,
  handleSearch: PropTypes.func,
  filterContact: PropTypes.func,
  label: PropTypes.string,
};
