export default (state = {
    tables: {
        "1": { amt: 0, no_of_items: 0, orders: {} },
        "2": { amt: 0, no_of_items: 0, orders: {} },
        "3": { amt: 0, no_of_items: 0, orders: {} },
        "4": { amt: 0, no_of_items: 0, orders: {} },
        "5": { amt: 0, no_of_items: 0, orders: {} }
    },
    items: {
        "Manchuria": 200, "Spring Roll": 190, "Panner 65": 150, "Veg Bullet": 230, "Finger Chips": 250,
        "Tomato Soup": 100, "Veg Corn Soup": 120, "Manchow Soup": 130, "Hot & Sour Soup": 115, "Sweet Corn Soup": 120,
        "Fried Rice": 190, "Schezwan Noodles": 200, "Paneer Fried Rice": 230, "Fried Noodles": 230, "Masala Fried Rice": 220,
        "Kadai Paneer": 200, "Dal Fry": 120, "Butter Roti": 100, "Kulcha": 120, "Naan": 90,
        "Gulab Jamun": 110, "Choclate Brownie": 180, "Strawberry ice-cream": 100, "Choclate Ice-cream": 120, "Vanilla IceCream": 100,
        "Coke": 100, "Sprite": 100, "Fanta": 100, "Butter Milk": 130, "Lassi": 170
    },
    menu: {
        "Starters": ["Manchuria", "Spring Roll", "Panner 65", "Veg Bullet", "Finger Chips"],
        "Soups": ["Tomato Soup", "Veg Corn Soup", "Manchow Soup", "Hot & Sour Soup", "Sweet Corn Soup"],
        "Chinese": ["Fried Rice", "Schezwan Noodles", "Paneer Fried Rice", "Fried Noodles", "Masala Fried Rice"],
        "Indian": ["Kadai Paneer", "Dal Fry", "Butter Roti", "Kulcha", "Naan"],
        "Deserts": ["Gulab Jamun", "Choclate Brownie", "Strawberry ice-cream", "Choclate Ice-cream", "Vanilla IceCream"],
        "Beverages": ["Coke", "Sprite", "Fanta", "Butter Milk", "Lassi"]
    },
    draggedItem: null,
    itemPrice: 0,
    open: false,
    modified:false
},
    action) => {
    switch (action.type) {
        case "createMenu": {
            let menu = action.menu;
            let resMenu = {}
            let items = {}
            menu.map((item) => {
                resMenu[item.itemCategory] = []
                items[item.itemName] = Number(item.itemPrice)
            });
            menu.map((item) => {
                if (item.itemName !== null)
                    resMenu[item.itemCategory] = [...resMenu[item.itemCategory], item.itemName]
            });
            state = { ...state, menu: resMenu, items: items }
            break;
        }
        case "createTables": {
            let tables = action.tables
            let resTables = {}
            tables.map((table) => {
                resTables[table.tableId] = {}
                resTables[table.tableId]["amt"] = table.amount
                resTables[table.tableId]["no_of_items"] = table.noOfItems
                resTables[table.tableId]["orders"] = {}
            })
            state = { ...state, tables: resTables }
            break;
        }
        case "createOrder": {
            let tables = {  };
            Object.entries(state.tables).map(([id,table])=>{
                    tables[id]={}
                    tables[id]["amt"]=state.tables[id]["amt"]
                    tables[id]["no_of_items"]=state. tables[id]["no_of_items"]
                    tables[id]["orders"]={}
            });

            (action.orders).map((order) => {

                tables[order.tableId].orders[order.itemName] = order.quantity
            }
            )
            state = { ...state, tables:{...tables},modified:!state.modified }
            break;
        }
        case "deleteOrder": {
            const table_no = action.table_no;
            let res;
            Object.entries(state.tables).map(([index, val]) => {
                if (index === table_no) res = val
            }
            );
            let amt = res.amt;
            let no_of_items = res.no_of_items;
            let orders = res.orders;
            let temp = 0;
            const item = action.item;
            const price = state.items[item];
            Object.entries(orders).map(([order, no]) => {
                if (order === item) {
                    temp = no;
                    delete orders[item];
                }

            });
            amt = Number(amt) - Number(temp) * Number(price);
            no_of_items = Number(no_of_items) - Number(temp);
            const tables = { ...state.tables, [table_no]: { amt, no_of_items, orders } }
            state = { ...state, tables }
            break;
        }
        case "modifyOrder": {
            const tableNo = action.tableNo;
            let res;
            Object.entries(state.tables).map(([index, val]) => {
                if (index === tableNo) res = val
            }
            );
            let amt = 0;
            let noOfItems = 0;
            let orders = { ...res.orders };
            const modifiedQuantity = action.quantity;
            const itemName = action.itemName;
            Object.entries(orders).map(([order, no]) => {
                if (order === itemName) {
                    orders[itemName] = modifiedQuantity + no;
                }
                amt = Number(amt) + Number(state.items[order]) * Number(orders[order]);
                noOfItems = Number(noOfItems) + Number(orders[order]);
            });
            const tables = { ...state.tables, [tableNo]: { amt, no_of_items: noOfItems, orders } }
            state = { ...state, tables,modified:!state.modified }
            break;
        }
        case "dragItem": {
            state = { ...state, draggedItem: action.itemName, itemPrice: action.itemPrice };
            break;
        }
        case "dropItem": {
            const table_no = action.tableNo;
            let res;
            Object.entries(state.tables).map(([index, val]) => {
                if (index === table_no) res = val
            }
            );
            const item = state.draggedItem;
            const price = state.items[item];
            let amt = Number(res.amt) + Number(price);
            amt = Number(amt);
            const no_of_items = res.no_of_items + 1;
            let orders = res.orders;
            let flag = 0;
            Object.entries(orders).map(([order, no]) => {
                if (order === item) {
                    orders[item] = no + 1;
                    flag = 1;
                }
            });
            if (flag === 0) orders[item] = 1;
            const tables1 = { ...state.tables, [table_no]: { amt, no_of_items, orders } }
            state = { ...state, tables: tables1 }
            break;
        }
        case "setOpen":
            state = { ...state, open: !state.open }
            break;
        case "closeSession": {
            let session = {...state.tables}
            let tableId = action.tableId
            session[tableId]["amt"] = 0
            session[tableId]["no_of_items"] = 0
            session[tableId]["orders"] = {}
            state = { ...state, tables: session }
            break;
        }
        default:
    }
    return state;
};