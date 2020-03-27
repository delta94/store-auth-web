import { useState, FormEvent } from 'react';

type FieldError = {
  value: string;
  touched: boolean;
  empty: boolean;
}

export default (fields: string[]) => {
  const errorsInit = fields.reduce((state, field) => ({
    ...state,
    [field]: {
      value: '',
      touched: false,
      empty: true,
    },
  }), {});

  const [errors, setErrors] = useState<Record<string, FieldError>>(errorsInit);

  const handleErrorsChange = (field: string, value: string, empty = false) => {
    setErrors({
      ...errors,
      [field]: {
        value,
        touched: true,
        empty,
      },
    });
  };

  const getFormSubmitData = (event: FormEvent) => {
    const form: any = event.target;
    const formData = fields.reduce((result: any, field) => ({
      ...result,
      [field]: form[field].value,
    }), {});
    
    return formData;
  };

  const isFormValid = Object.values(errors).every(({ value, touched, empty }) => !value && touched && !empty);

  return { errors, handleErrorsChange, isFormValid, getFormSubmitData };
};
