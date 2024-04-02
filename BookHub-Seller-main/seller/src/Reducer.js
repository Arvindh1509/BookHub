export const initialState={
user:null,
userEmail:null,
books:[]
}

function reducer(state,action){
    switch(action.type){
        case 'loginSeller':
            return{
                ...state,
                user:action.user,
                userEmail:action.userEmail
            }

        case 'logoutSeller':
            return{
                user:null,
                userEmail:null
            }    

        case 'addbooks':
            return{
                ...state,
                books:action.books
            }
        default:
            return state
    }
}

export default reducer;