import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  other: '',
  description: '',
  question1: 'Kuluttajat',
  question1Other: '',
  question2: 'Ei rajoittavia tekijöitä',
  question2Other: '',
  question3: 'Ei tarvetta',
  question4: '',
  isOpenFeedPost: true,
  minPrice: '',
  maxPrice: '',
}

const slice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    update(state, action) {
      const updatedFields = action.payload
      return {
        ...state,
        ...updatedFields
      }
    }
  },
})

 export const { set, update } = slice.actions

 export const resetFormData = () => {
   return async dispatch => {
     dispatch(set(initialState))
   }
 }

 export default slice.reducer