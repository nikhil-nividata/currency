import React from "react";
import { Select } from "react-materialize";
import CurrencyInfo from "../../../utils/currencyInfo";

export default function index({ onChange, value, name, multiple }) {
  return (
    <div>
      <Select
        id={name}
        name={name}
        multiple={multiple || false}
        onChange={onChange}
        options={{
          classes: "",
          dropdownOptions: {
            alignment: "left",
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          },
        }}
        value={value}
      >
        <option disabled value="">
          Choose Currency
        </option>

        {Array.from(CurrencyInfo.keys()).map((key) => {
          return (
            <option
              style={{
                color: "black",
              }}
              value={key}
              key={key}
            >
              {CurrencyInfo.get(key)}
            </option>
          );
        })}
      </Select>
    </div>
  );
}
