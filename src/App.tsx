import { FC, useCallback, useState } from "react";
import "./style.css";
import { UnitChange, UnitTypes } from "./types";
import countDecimals from "./utils";

const units = [
  {
    unit: "microm",
    text: "micrometer",
    index: -6,
  },
  {
    unit: "mm",
    text: "millimeter",
    index: -3,
  },
  {
    unit: "cm",
    text: "centimeter",
    index: -2,
  },
  {
    unit: "dm",
    text: "decimeter",
    index: -1,
  },
  {
    unit: "m",
    text: "meter",
    index: 0,
  },
  {
    unit: "km",
    text: "kilometer",
    index: 3,
  },
];

function changeInput(inputValue: number, unit1: UnitTypes, unit2: UnitTypes) {
  const index1 = units.indexOf(units.filter((item) => item.unit === unit1)[0]);
  const index2 = units.indexOf(units.filter((item) => item.unit === unit2)[0]);
  if (units[index1].index - units[index2].index > 0) {
    return inputValue * Math.pow(10, units[index1].index - units[index2].index);
  } else {
    let fix =
      units[index2].index - units[index1].index + countDecimals(inputValue);
    if (fix > 20) fix = 20;
    let fixedValue = (
      inputValue * Math.pow(10, units[index1].index - units[index2].index)
    ).toFixed(fix);
    for (let i = fixedValue.length - 1; i > 0; i--) {
      if (fixedValue[i] === "0") {
        fixedValue.slice(0, -1);
      } else break;
    }
    return fixedValue;
  }
}

export const App: FC<{}> = ({}) => {
  const [unit1, setUnit1] = useState<UnitTypes>("m");
  const [unit2, setUnit2] = useState<UnitTypes>("cm");
  const [value1, setValue1] = useState<string | number>(10);
  const [value2, setValue2] = useState<string | number>(1000);

  const input1ChangekHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(+e.target.value)) {
        setValue2(changeInput(+e.target.value, unit1, unit2));
        setValue1(+e.target.value);
      }
    },
    [unit1, unit2]
  );

  const unitChangeHandler = useCallback(
    ({ id, e }: UnitChange) => {
      if (id === 1) {
        setValue2(changeInput(+value1, e.target.value as UnitTypes, unit2));
        setUnit1(e.target.value as UnitTypes);
      } else if (id === 2) {
        setUnit2(e.target.value as UnitTypes);
        setValue2(changeInput(+value1, unit1, e.target.value as UnitTypes));
      }
    },
    [value1, unit1, unit2]
  );

  return (
    <>
      <div>
        <input type="number" value={value1} onChange={input1ChangekHandler} />
        <select onChange={(e) => unitChangeHandler({ id: 1, e })}>
          {units.map((item) => {
            return <option selected={item.unit === unit1}>{item.unit}</option>;
          })}
        </select>
      </div>
      equals
      <div>
        <input type="number" disabled value={value2} />
        <select onChange={(e) => unitChangeHandler({ id: 2, e })}>
          {units.map((item) => {
            return <option selected={item.unit === unit2}>{item.unit}</option>;
          })}
        </select>
      </div>
    </>
  );
};
