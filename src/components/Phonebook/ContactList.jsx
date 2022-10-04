import React from 'react';
import PropTypes from 'prop-types';
import css from '../Phonebook/Phonebook.module.scss';

export default function ContactList({ contacts, removeContact }) {
  const elements = contacts.map(contact => {
    return (
      <li key={contact.id} className={css.contactList}>
        {contact.name}: {contact.number}
        <button
          className={(css.submitButton, css.deleteButton)}
          onClick={() => removeContact(contact.id)}
        >
          Delete
        </button>
      </li>
    );
  });
  return (
    <div>
      <ul className={css.labelText}>{elements.length === 0 ? '' : elements}</ul>
    </div>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
