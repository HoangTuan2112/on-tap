import { createSlice } from "@reduxjs/toolkit";

const calculatorReducer = createSlice({
  name: "calculator",
  initialState: {
    a: 0,
    b: 0,
    result: "",
  },
  reducers: {
    setA: (state, action) => {
      state.a = action.payload;
    },
    setB: (state, action) => {
      state.b = action.payload;
    },
    add: (state) => {
      state.result = eval(state.a + state.b);
    },
    subtract: (state) => {
      state.result =eval(state.a - state.b);
    },
    multiply: (state) => {
      state.result = eval(state.a * state.b);
    },
    devide: (state) => {
      state.result = eval(state.a / state.b);
    },
  },
});
export const { add, subtract,multiply,devide, setA, setB } = calculatorReducer.actions;
export default calculatorReducer.reducer;
