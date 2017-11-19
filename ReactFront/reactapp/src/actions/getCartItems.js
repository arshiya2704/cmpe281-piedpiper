export const getCartItems=(items) => {
    return(
    {
        type:"GET_CART_ITEMS",
        data: items
    }
    );
}
