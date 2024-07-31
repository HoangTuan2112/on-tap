import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from './calculatorReducer'
import todoReducer from './todoReducer'

export const store = configureStore({
    reducer: {
        calculator:calculatorReducer,
        todo:todoReducer
    }
    

})
export default store
