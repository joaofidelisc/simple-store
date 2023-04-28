import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [],
    currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : [],
    paymentMethod: localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action){
            const infoUser = action.payload;
            const userExists = state.users.find((user) => user.email === infoUser.email);
            if (!userExists){
                state.users.push({
                    name: infoUser.name,
                    email: infoUser.email,
                    password: infoUser.password,
                    birthdate: infoUser.birthdate,
                    cpf: infoUser.cpf
                });
            }
        },
        loginUser(state, action){
            const infoUser = action.payload;
            state.currentUser.push({
                email: infoUser.email,
                password: infoUser.password,
            });
        },
        logoutUser(state, action){
            state.currentUser = [];
        },
        addPaymentMethod(state, action){
            state.paymentMethod = action.payload;
        }
    },
});

export const { addUser, loginUser, logoutUser, addPaymentMethod} = userSlice.actions;
export default userSlice.reducer;