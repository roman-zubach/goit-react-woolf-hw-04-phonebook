import React, { useState } from 'react';
import './assets/index.css';

const defaultState = {
  name: '',
  number: '',
};

export const ContactForm = ({ save, isNameExist }) => {
  const [formData, setFormData] = useState(defaultState);
  const { name, number } = formData;

  const clearState = () => {
    setFormData(defaultState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNameExist(name)) {
      window.alert(`${name} is already in contacts.`);

      return;
    }

    save({ name, number });

    clearState();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="number">Number</label>
        <input
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit">Add contact</button>
    </form>
  );
};
