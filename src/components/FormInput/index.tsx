import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'components';
import { useDebounce } from 'hooks';

const debouncingTime = Number(process.env.REACT_APP_VALIDATION_DEBOUNCING_TIME);

type ValidationResult = {
  valid: boolean;
  error: string;
}

interface Props {
  type: string;
  name: string;
  label: string;
  onValidate: (field: string, value: string, empty?: boolean) => void;
  validate: (value: string) => ValidationResult | Promise<ValidationResult>;
  validationType?: 'blur' | 'change' | 'debounce'; 
  className?: string;
  isSuccessed?: boolean;
  value?: string;
  error?: string;
  autoFocus?: boolean;
  tooltip?: string;
}

const FormInput = (props: Props) => {
  const {
    name,
    validate,
    onValidate,
    validationType = 'blur',
    error: initError = '',
    value: initValue = '',
    ...rest
  } = props;

  const { t } = useTranslation();
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(initError);
  const debouncedValue = useDebounce(value, debouncingTime);

  const validatedValue = validationType === 'debounce' ? debouncedValue : value;

  useEffect(() => setError(initError), [initError]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!newValue) onValidate(name, error, true); // Set empty

    if (!value && newValue) onValidate(name, error, false); // Set not empty

    setValue(newValue);
  };

  const handleValidate = async () => {
    let newError = '';

    if (!validatedValue) {
      newError = t('errors.empty-field');
    } else {
      const { valid, error: validateError } = await validate(validatedValue);
      newError = valid ? '' : t(validateError);
    }

    onValidate(name, newError);
    setError(newError);
  };

  useEffect(() => {
    if (!touched || validationType === 'blur') return;

    handleValidate();
    // eslint-disable-next-line
  }, [validatedValue]);

  const handleFocus = () => {
    setTouched(true);
    onValidate(name, '', value.length === 0); // Drop error on focus
  };

  return (
    <Input
      {...rest}
      name={name}
      value={value}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleValidate}
      error={error}
    />
  );
};

export default React.memo(FormInput);
