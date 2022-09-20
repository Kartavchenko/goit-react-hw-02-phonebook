export function ListContacts({ contacts, removeContact }) {
  const user = contacts.map(({ name, number, id }) => {
    return (
      <li key={id}>
        {name}: {number}
        <button type="button" onClick={() => removeContact(id)}>
          Delete
        </button>
      </li>
    );
  });

  return <ul>{user}</ul>;
}
