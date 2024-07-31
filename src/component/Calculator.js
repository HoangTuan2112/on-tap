import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Input } from "reactstrap";
import {
  add,
  devide,
  multiply,
  setA,
  setB,
  subtract,
} from "../redux/calculatorReducer";
import { useState } from "react";

export default function Calculator() {
  const { calculator } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [textA, setTextA] = useState();
  const [textB, setTextB] = useState();
  return (
    <div>
      <Input
        type="number"
        placeholder="Enter a"
        value={textA}
        onChange={(e) => {
          setTextA(e.target.value * 1);
        }}
      />
      <Input
        type="number"
        placeholder="Enter b"
        value={textB}
        onChange={(e) => {
          setTextB(e.target.value * 1);
        }}
      />
      <h1>Ket qua: {calculator.result}</h1>

      <Button
        className="btn"
        color="primary"
        onClick={() => {
          dispatch(setA(textA));
          dispatch(setB(textB));
          dispatch(add());
          setTextA("");
          setTextB("");
        }}
      >
        Add
      </Button>
      <Button
        color="primary"
        onClick={() => {
          dispatch(setA(textA));
          dispatch(setB(textB));
          dispatch(subtract());
          setTextA("");
          setTextB("");
        }}
      >
        Subtract
      </Button>
      <Button
        color="primary"
        onClick={() => {
          dispatch(setA(textA));
          dispatch(setB(textB));
          dispatch(multiply());
          setTextA("");
          setTextB("");
        }}
      >
        multiply
      </Button>
      <Button
        color="primary"
        onClick={() => {
          dispatch(setA(textA));
          dispatch(setB(textB));
          dispatch(devide());
          setTextA("");
          setTextB("");
        }}
      >
        devide
      </Button>
    </div>
  );
}
