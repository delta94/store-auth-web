import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleInput } from 'components';
import useThrottle from 'hooks/useThrottle';

const throttlingTime = Number(process.env.REACT_APP_VALIDATION_THROTTLING_TIME);

interface Props {
  label: string;
  onValidate: (field: string, value: string) => void;
  validate: (value: string) => Promise<boolean>;
  className?: string;
  value?: string;
  error?: string;
  focus?: boolean;
  isSuccessed?: boolean;
  tooltip?: string;
}

const DisplayNameInput = (props: Props) => {
  const {
    validate,
    focus,
    onValidate,
    error: initError = '',
    value: initValue = '',
    ...rest
  } = props;

  const { t } = useTranslation();
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState(initError);

  const throttledValue = useThrottle(value, throttlingTime);

  useEffect(() => setError(initError), [initError]);

  useEffect(() => {
    if (!touched) return;

    validate(throttledValue)
      .then(isValid => {
        let newError = '';

        if (!throttledValue) {
          newError = t('errors.empty-field');
        } else if (!isValid) {
          newError = t('errors.already-taken');
        }
    
        onValidate('displayName', newError);
        setError(newError);
      });
  }, [throttledValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleTouch = () => {
    if (!touched) setTouched(true);
  };

  return (
    <SimpleInput
      onFocus={handleTouch}
      name="displayName"
      type="text"
      value={value}
      onChange={handleChange}
      autoFocus={focus}
      error={error}
      {...rest}
    />
  );
};

export default React.memo(DisplayNameInput);
