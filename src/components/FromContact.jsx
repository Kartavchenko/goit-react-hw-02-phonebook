import { Component } from 'react';
import PropTypes from 'prop-types';

export class FormContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.addContact({ name, number });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              Name
              <input
                style={{
                  width: '200px',
                  marginTop: '5px',
                }}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              Number
              <input
                style={{
                  width: '200px',
                  marginTop: '5px',
                }}
                type="tel"
                name="number"
                value={this.state.number}
                onChange={this.handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </label>
          </div>
          <button type="submit" style={{ marginBottom: '10px' }}>
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}

FormContact.propTypes = {
  lable: PropTypes.string,
};
