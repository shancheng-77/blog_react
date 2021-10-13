

const initState = {
    sideType:sessionStorage.getItem('sideType')||'main',
    headTags:'main',
    linkType:'all',
}
let reducer = (state=initState,action) => {
    switch (action.type) {
        case 'side_change':
            return {
                ...state,
                sideType: action.msg,
            };
        case 'link_change':
            return {
                ...state,
                linkType: action.msg,
            }
        default:return state;
    }
}
export default reducer
