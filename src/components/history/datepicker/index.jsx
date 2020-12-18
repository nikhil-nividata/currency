import React from "react";
import { DatePicker } from "react-materialize";

const inedx = ({ name, onChange, placeholder, maxDate, minDate, value }) => {
  const dateValue = value !== null ? value.toDateString() : null;
  return (
    <div>
      <DatePicker
        value={dateValue !== null ? dateValue : undefined}
        placeholder={placeholder}
        onChange={onChange}
        id={name}
        name={name}
        options={{
          autoClose: false,
          yearRange: 20,
          maxDate,
          minDate,
        }}
      />
    </div>
  );
};

export default inedx;
