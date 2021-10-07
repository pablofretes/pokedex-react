import React from 'react';

const TextField = ({ field, placeholder }) => (
  <input placeholder={placeholder} {...field} />
);

export default TextField;