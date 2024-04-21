export const initialState={
    basket:[],
    order:[],
    viewedBook:null,
    user:null,
    userLastname:null,
    userEmail:null,
    userAddress:null,
    userContact:null,
    checkbox:false,
    price:0,
    favourite:[],
    direct_order:[],
    direct_price:0
}

export const getBasketTotal  = (basket,checkbox) =>{ 
    
    const additionalAmount = (checkbox==true) ? 0:200;
    console.log("into the function",checkbox);
    console.log(additionalAmount);
    return (additionalAmount+basket?.reduce((amount, item) => {
   
    return amount + (item.price*(item.quantity?item.quantity:1  )) ;
  }, 0))};
  
function reducer(state,action){
    console.log(action);
    switch(action.type){ 
        case 'login':
                return{
                    ...state,
                    user:action.user,
                    userLastname:action.userLastname,
                    userAddress:action.userAddress,
                    userEmail:action.userEmail,
                    userContact:action.userContact
                }

        case 'logout':
            return{
                ...state,
                basket:[],
                order:[],
                viewedBook:null,
                user:null,
                userAddress:null,
                checkbox:false,
                price:0
            }

        case 'add_to_basket': //from book.js and book_seperate.js
            return {
                ...state,
                basket:[...state.basket,action.item]
            }

        case 'remove_item': 
            return{
                ...state,basket:state.basket.filter(item =>
                    item.id !== action.payload)
            }

        case 'checkbox':
            {console.log(action.checkbox);}
            return{
                ...state,
                checkbox:action.checkbox
            }
        
        case 'viewBook': // from book.js
                return{
                    ...state,
                    viewedBook:action.item
                }
            
        case 'add_to_order':
                return{
                    ...state,
                    order:action.payload.basket,
                    price:action.payload.price
                }

        case 'add_to_fav':
            return{
                ...state,
                favourite:[...state.favourite,action.item]
            }

        case 'remove_from_fav': 
            return{
                ...state,favourite:state.favourite.filter(item =>
                    item.id !== action.id)
            }
            
        case 'empty_basket':
               return {
                ...state,
                basket:[],
                }

        case 'direct_order':
            {
                console.log(action.payload.price);
            }
            return{
                ...state,
                direct_order:[...state.direct_order,action.item],
                direct_price:action.payload.price
            }

        case 'finish_direct':
            return{
                 ...state,
                  direct_order:[]
              }
        case 'editBuyer':
            return{
                ...state,
                user:action.user,
                userAddress:action.userAddress
            }
                
        default:
            return state;
    }
}

export default reducer;