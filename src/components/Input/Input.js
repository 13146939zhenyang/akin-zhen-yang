import React, { useState, useEffect, useCallback } from "react";
import "./Input.css";

/**
 * <Input
 *   className="MyInput"
 *   data-something="Value"
 *   value="Hello, World!"
 *   onChange={(value) => console.log('You typed', value)}
 * />
 *
 * @prop {string} value The default value for the input.
 * @prop {string} placeholder The placeholder text.
 * @prop {Function} onChange Callback that will receive current input value.
 * @prop {mixed} ... All other props will be forwarded to the native DOM input.
 */
export function Input(props) {
  const { className, value, onChange, ...otherProps } = props;

  const [inputValue, setInputValue] = useState(value);
  // Data would be used to API call
  const [searchValue, setSearchValue] = useState(value);
  //   Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  };
  //   Debounce the API call
  const debouncedSave = useCallback(
    debounce((nextValue) => setSearchValue(nextValue), 500),
    [] // will be created only once initially
  );

  function handleChange(event) {
    setInputValue(event.target.value);
    // Use debounce to avoid too many API calls
    const { value: nextValue } = event.target;
    debouncedSave(nextValue);
  }

  useEffect(() => {
    if (searchValue) {
      onChange && onChange(searchValue);
    }
  }, [searchValue]);

  return (
    <input
      className={"Input " + (className || "")}
      type="text"
      value={inputValue}
      onChange={handleChange}
      {...otherProps}
    />
  );
}
