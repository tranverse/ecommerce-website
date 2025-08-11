import CartService from "@services/cart.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(_, thunkAPI) => {
        const state = thunkAPI.getState()
        if(!state.customer.isLoggedIn){
            return thunkAPI.rejectWithValue('Customer not logged in')
        }
        const response = await CartService.getAllProducts()
        return response.data.data
    }
)

export const addProductToCart = createAsyncThunk(
    'cart/add',
    async(payload, thunkAPI) => {
        const response = await CartService.addProductToCart(payload)
        return response.data.data
    }
)

export const updateQuantity = createAsyncThunk(
    'cart/update',
    async(payload, thunkAPI) => {
        const response = await CartService.updateQuantity(payload)
        return response.data.data

    }
)
export const deleteProductFromCart = createAsyncThunk(
    'cart/delete',
    async({productId, customerId}, thunkAPI) => {
        const response = await CartService.deleteProduct(productId, customerId)
        return response.data.data

    }
)
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        highlight: false
    },
    reducers: {
        clearCart(state){
            state.items = []
        },
        resetHightlight(state){
            state.highlight = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.items = action.payload
            state.highlight = true
        })
        .addCase(addProductToCart.fulfilled, (state, action) => {
            const updated = action.payload;
            const index = state.items.findIndex(item => item.id === updated.id);
            if (index !== -1) {
                state.items[index].quantity = updated.quantity;
            } else {
            }
        })
        .addCase(updateQuantity.fulfilled, (state, action) => {
            const {productId, quantity} = action.payload;
            const item = state.items.find(product => product.product.id == productId)
            item.quantity = quantity
        })
        .addCase(deleteProductFromCart.fulfilled, (state, action) => {
            const productId = action.payload
            const item = state.items.find(product => product.product.id == productId)
            state.items = state.items.filter(p => p.product.id !== productId);
        })
    }
})

export const {clearCart, resetHightlight} = cartSlice.actions
export default cartSlice.reducer