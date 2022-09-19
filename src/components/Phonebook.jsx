import { Component } from 'react';
import { FormContact } from './FromContact';
import { ListContacts } from './ListContacts';
import { nanoid } from 'nanoid';

export class Phonebook extends Component {
    state = {
        contacts: [],
    }

    addContact = (contact) => 
        this.setState((prevState) => {
            const newContact = {
                id: nanoid(),
                ...contact
            }
            return {
                contacts: [...prevState.contacts, newContact]
            }
        })
    
  render() {
      const { contacts } = this.state;
    return (
      <div>
            <FormContact addContact={this.addContact} />
            <ListContacts contacts={contacts} />
      </div>
    );
  }
}
