export default (state = {
    orders:[]
}, action) => {
    switch (action.type) {
        case "createOrders":
            let orders=action.orders
            let resOrders=[];
            (orders).map((order)=>{
                resOrders.push({tableId:order.tableId,itemName:order.itemName,quantity:order.quantity})
            })
            state={orders:resOrders}
            break;
        default:
    }
    return state;
}