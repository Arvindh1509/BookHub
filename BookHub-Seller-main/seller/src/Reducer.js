export const initialState={
seller:null,
sellerEmail:null,
sellerAddress:null,
sellerContact:null,
current_isbn:null,
books:[]
}

function reducer(state,action){
    switch(action.type){
        case 'loginSeller':
            return{
                ...state,
                seller:action.user,
                sellerEmail:action.userEmail,
                sellerAddress:action.userAddress,
                sellerContact:action.userContact
            }

        case 'logoutSeller':
            return{
                seller:null,
                sellerEmail:null,
                sellerAddress:null,
                sellerContact:null
            }    

        case 'addbooks':
            return{
                ...state,
                books:action.books
            }

        case 'editSeller':
            return{
                ...state,
                seller:action.user,
                sellerAddress:action.userAddress,
                sellerContact:action.userContact
            }

        case 'editPrice':
            return{
                ...state,
                current_isbn:action.isbn
            }
        
        case 'editQuantity':
            return{
                ...state,
                current_isbn:action.isbn
            }

        case 'clearPrice':
            return{
                ...state,
                current_isbn:null
            }
        
        case 'clearQuantity':
             return{
                    ...state,
                    current_isbn:null
            }
        default:
            return state
    }
}

export default reducer;