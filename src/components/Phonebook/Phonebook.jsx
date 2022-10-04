import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from '../Phonebook/Phonebook.module.scss';

import React from 'react';

export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
    return value ?? [];
  });
  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //   componentDidMount() {
  //     try {
  //       const parseContacts = JSON.parse(localStorage.getItem('contacts'));
  //       if (parseContacts?.length) {
  //         this.setState({ contacts: parseContacts });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     const { contacts } = this.state;
  //     if (prevState.contacts !== contacts) {
  //       localStorage.setItem('contacts', JSON.stringify(contacts));
  //     }
  //   }

  const addConctact = data => {
    if (noDuplicates(data)) {
      return alert(`${data.name} is already in contacts.`);
    }
    setContacts(prevState => {
      const newContact = { id: nanoid(), ...data };

      return [...prevState, newContact];
    });
  };

  const searchContact = e => {
    const { value } = e.target;
    setFilter({ value });
  };

  const filteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normilizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact => {
      const normilizeName = contact.name.toLowerCase();

      const result = normilizeName.includes(normilizedFilter);

      return result;
    });
    return filteredContacts;
  };

  const noDuplicates = ({ name }) => {
    const result = contacts.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    return result;
  };

  const removeContact = id => {
    setContacts(prevState => {
      const newContacts = prevState.filter(item => item.id !== id);
      return newContacts;
    });
  };

  const filteredContactsList = filteredContacts();
  return (
    <>
      <div className={css.mainWrapper}>
        <ContactForm onSubmit={addConctact} />
      </div>
      <div>
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={searchContact}></Filter>
        <ContactList
          contacts={filteredContactsList}
          removeContact={removeContact}
        />
      </div>
    </>
  );
}

// export default class Phonebook extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//   componentDidMount() {
//     try {
//       const parseContacts = JSON.parse(localStorage.getItem('contacts'));
//       if (parseContacts?.length) {
//         this.setState({ contacts: parseContacts });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts !== contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   addConctact = data => {
//     if (this.noDuplicates(data)) {
//       return alert(`${data.name} is already in contacts.`);
//     }
//     this.setState(prevState => {
//       const newContact = { id: nanoid(), ...data };

//       return {
//         contacts: [...prevState.contacts, newContact],
//       };
//     });
//   };

//   searchContact = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   filteredContacts() {
//     const { contacts, filter } = this.state;
//     if (!filter) {
//       return contacts;
//     }
//     const normilizedFilter = filter.toLocaleLowerCase();
//     const filteredContacts = contacts.filter(contact => {
//       const normilizeName = contact.name.toLocaleLowerCase();
//       const result = normilizeName.includes(normilizedFilter);
//       return result;
//     });
//     return filteredContacts;
//   }

//   noDuplicates({ name }) {
//     const { contacts } = this.state;
//     const result = contacts.find(
//       item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
//     );
//     return result;
//   }

//   removeContact = id => {
//     this.setState(prevState => {
//       const newContacts = prevState.contacts.filter(item => item.id !== id);
//       return {
//         contacts: newContacts,
//       };
//     });
//   };

//   render() {
//     const { addConctact, searchContact, removeContact } = this;
//     const { filter } = this.state;
//     const contacts = this.filteredContacts();
//     return (
//       <>
//         <div className={css.mainWrapper}>
//           <ContactForm onSubmit={addConctact} />
//         </div>
//         <div>
//           <h2 className={css.title}>Contacts</h2>
//           <Filter value={filter} onChange={searchContact}></Filter>
//           <ContactList contacts={contacts} removeContact={removeContact} />
//         </div>
//       </>
//     );
//   }
// }
