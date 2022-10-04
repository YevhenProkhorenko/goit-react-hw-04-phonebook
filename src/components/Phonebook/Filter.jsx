import React from 'react';
import PropTypes from 'prop-types';
import css from '../Phonebook/Phonebook.module.scss';

export default function Filter({ filter, onChange }) {
  return (
    <div>
      <label className={(css.labelText, css.formFlex)}>
        Find contacts by name:
        <input
          className={css.inputStyles}
          type="text"
          name="filter"
          value={filter}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

Filter.defaultProps = {
  filter: '',
};
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
