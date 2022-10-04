import React from 'react';
import PropTypes from 'prop-types';
import css from '../Phonebook/Phonebook.module.scss';

export default function Wrapper({ title, children }) {
  return (
    <div>
      <h1 className={css.title}>{title}</h1>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
};
