export default (state =
    {
        tables: [1, 2, 3],
        bills:{}
        
    }, action) => {
    switch (action.type) {
        case "createTables":
            let tables=action.tables
            let resTables=[]
            var i=1;
            tables.map((table)=>{
                resTables.push(i)
                i++;
            })
            state={...state,tables:resTables}
            break;
        case "createTable":
            state = { ...state, tables: [...state.tables, state.tables.length + 1] }
            break;
        case "deleteTable":
            var tempTables = [...state.tables]
            tempTables.pop()
            state = { ...state, tables: [...tempTables] }
            break;
        case "createBills":
        let bills=action.bills
        let resBills={}
        bills.map((bill)=>{
            resBills[bill.tableId]={}
            resBills[bill.tableId]["amount"]=bill.amount;
            resBills[bill.tableId]["noOfItems"]=bill.noOfItems;
            resBills[bill.tableId]["orders"]=bill.orders
        });
        state={...state,bills:resBills}    
        break;
        default:
    }
    return state;
};