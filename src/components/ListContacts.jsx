
export const ListContacts = ({ contacts }) => {
    const user = contacts.map(({ name, number, id }) => {
        return <li key={id}>{name}: {number}</li>
    })
    
    return (
        <ul>{user}</ul>
    )
};
