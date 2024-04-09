export const initialState={
user:null,
userEmail:null,
userAddress:null,
userContact:null,
current_isbn:null,
books:[]
}

function reducer(state,action){
    switch(action.type){
        case 'loginSeller':
            return{
                ...state,
                user:action.user,
                userEmail:action.userEmail,
                userAddress:action.userAddress,
                userContact:action.userContact
            }

        case 'logoutSeller':
            return{
                user:null,
                userEmail:null,
                userAddress:null,
                userContact:null
            }    

        case 'addbooks':
            return{
                ...state,
                books:action.books
            }

        case 'editSeller':
            return{
                ...state,
                user:action.user,
                userAddress:action.userAddress,
                userContact:action.userContact
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