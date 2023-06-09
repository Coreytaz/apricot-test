import { useEffect, useState } from 'react';

import useCurrentState from '../useCurrentState';

export type BindingsChangeTarget =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string;

type validProps = {
  isEmpty?: boolean;
};

export const useValid = (value: any, validators: validProps) => {
  const [empty, setEmpty] = useState(true);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const valid in validators) {
      switch (valid) {
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [validators, value]);

  useEffect(() => {
    if (empty) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [empty]);

  return {
    empty,
    inputValid,
  };
};

const useInput = (initialValue: string, validations: validProps) => {
  const [value, setValue, currentRef] = useCurrentState<string>(initialValue);
  const valid = useValid(value, validations);
  const [isDirty, setDirty] = useState(false);

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    setValue,
    currentRef,
    reset: () => setValue(initialValue),
    bindings: {
      value,
      onChange: (event: BindingsChangeTarget) => {
        if (typeof event === 'object' && event.target) {
          setValue(event.target.value);
        } else {
          setValue(event as string);
        }
      },
      isDirty,
      onBlur,
      ...valid,
    },
  };
};

export default useInput;
