import PropTypes from 'prop-types';

export function ListContacts({ contacts, removeContact }) {
  const user = contacts.map(({ name, number, id }) => {
    return (
      <li
        key={id}
        style={{
          marginBottom: '10px',
        }}
      >
        {name}: {number}
        <button
          type="button"
          onClick={() => removeContact(id)}
          style={{
            marginLeft: '5px',
          }}
        >
          Delete
        </button>
      </li>
    );
  });

  return <ul>{user}</ul>;
}

ListContacts.propTypes = {
  contacts: PropTypes.array,
  button: PropTypes.element,
};
