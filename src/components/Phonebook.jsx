import { Component } from 'react';
import { FormContact } from './FromContact';
import { ListContacts } from './ListContacts';
// import { SearchContact } from './SearchContact';
import { nanoid } from 'nanoid';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact =>
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });

  removeContact(id) {
    this.setState(prev => {
      const newContact = prev.contacts.filter(item => item.id !== id);
      return {
        contacts: newContact,
      };
    });
  }

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
      <div>
        <FormContact addContact={this.addContact} />
        {/* <SearchContact /> */}
        <label>
          Find contact by name
          <input
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.handleSearch}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <ListContacts contacts={contacts} remove={this.removeContact} />
      </div>
    );
  }
}
