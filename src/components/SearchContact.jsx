import { Component } from 'react';

export class SearchContact extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSearch = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  removeContact(id) {
    this.setState(prev => {
      const newContact = prev.contacts.filter(item => item.id !== id);
      return {
        contacts: newContact,
      };
    });
  }

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
    // const filter = this.filterContact();
    return (
      <label>
        Find contact by name
        <input
          type="text"
          name="filter"
          value={this.state.filter}
          onChange={this.handleSearch}
          required
        />
      </label>
    );
  }
}
