import React from 'react';
import { Form } from 'semantic-ui-react';
import { ErrorMessage, Field } from 'formik';

const TextField = ({ field, label, placeholder }) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
);

export default TextField;