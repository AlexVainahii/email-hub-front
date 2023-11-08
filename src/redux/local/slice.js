import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listBox: [],
  _id: null,
  path: null,
  page: 1,
  mail: null,
};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    changeLocal: (state, { payload }) => {
      state.listBox = [...payload];
    },
    changeId: (state, { payload }) => {
      state._id = payload;
    },
    changePath: (state, { payload }) => {
      state.path = payload;
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    changeMail: (state, { payload }) => {
      state.mail = payload;
    },
  },
});

export const localReducer = localSlice.reducer;
export const { changeLocal, changeId, changePage, changePath, changeMail } =
  localSlice.actions;
