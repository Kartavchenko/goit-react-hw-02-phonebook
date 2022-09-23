import { Component } from 'react';
import { FormContact } from '../Form/FromContact';
import { ListContacts } from '../List/ListContacts';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class App extends Component {
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

  filterContact = () => {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    const tolowerCase = filter.toLocaleLowerCase();
    const filterUser = contacts.filter(({ name, number }) => {
      const normalizeName = name.toLocaleLowerCase();
      const normalizeNamber = number.toLocaleLowerCase();
      const result =
        normalizeName.includes(tolowerCase) ||
        normalizeNamber.includes(tolowerCase);
      return result;
    });
    return filterUser;
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    return (
      <div
        style={{
          marginLeft: '50px',
          marginTop: '50px',
        }}
      >
        <h1>Phonebook</h1>
        <FormContact addContact={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter} />
        <h2>Contacts</h2>
        <ListContacts
          contacts={this.filterContact()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  addContact: PropTypes.func,
  removeContact: PropTypes.func,
  checkContact: PropTypes.func,
  handleSearch: PropTypes.func,
  filterContact: PropTypes.func,
  label: PropTypes.string,
};
