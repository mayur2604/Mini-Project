export default (state =
    {
        items: {
            "Manchuria": 200, "Spring Roll": 190, "Panner 65": 150, "Veg Bullet": 230, "Finger Chips": 250,
            "Tomato Soup": 100, "Veg Corn Soup": 120, "Manchow Soup": 130, "Hot & Sour Soup": 115, "Sweet Corn Soup": 120,
            "Fried Rice": 190, "Schezwan Noodles": 200, "Paneer Fried Rice": 230, "Fried Noodles": 230, "Masala Fried Rice": 220,
            "Kadai Paneer": 200, "Dal Fry": 120, "Butter Roti": 100, "Kulcha": 120, "Naan": 90,
            "Gulab Jamun": 110, "Choclate Brownie": 180, "Strawberry ice-cream": 100, "Choclate Ice-cream": 120, "Vanilla IceCream": 100,
            "Coke": 100, "Sprite": 100, "Fanta": 100, "Butter Milk": 130, "Lassi": 170
        },
        menu: {
            "Starters": ["Manchuria", "Spring Roll", "Panner 65"],
            "Soups": ["Tomato Soup", "Veg Corn Soup", "Hot & Sour Soup"],

            "Indian": ["Kadai Paneer", "Dal Fry", "Kulcha"],
            //   "Deserts": ["Gulab Jamun", "Choclate Brownie", "Strawberry ice-cream", "Choclate Ice-cream", "Vanilla IceCream"],
            "Beverages": ["Coke", "Sprite", "Fanta"]
        },
        itemName: "",
        itemPrice: 0,
        category: "",
        addOpen: false,
        editOpen: false,
        categoryOpen: false

    }, action) => {
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
                if(item.itemName!=null)
                resMenu[item.itemCategory] = [...resMenu[item.itemCategory], item.itemName]
            });
            state = { ...state, menu: resMenu, items: items }
            break;
        }
        case "createCategory": {
            let menu = {...state.menu};
            menu[state.category] = []
            state.category=""
            state = { ...state, menu: menu }
            break;
        }
        case "deleteCategory":{
            let menu={...state.menu};
            let items={...state.items}
            let category=action.category;
            let categoryItems=menu[category];
            categoryItems.map((item)=>{
                    delete items[item];
            });
            delete menu[category];
            state={...state,menu:menu,items:items}
            break;
        }
        case "createItem": {
            let items = { ...state.items }
            let menu = { ...state.menu }
            items[state.itemName] = state.itemPrice
            let categoryItems = menu[state.category]
            categoryItems.push(state.itemName)
            menu[state.category] = categoryItems
            state = { ...state, items: { ...items }, menu: { ...menu } }
            break;
        }
        case "deleteItem": {
            let items = { ...state.items }
            let menu = { ...state.menu }
            delete items[action.itemName]
            let categoryItems = menu[action.itemCategory]
            let filteredCategoryItems = categoryItems.filter((item) => {
                if (item !== action.itemName) return item
            });
            menu[action.itemCategory] = filteredCategoryItems
            state = { ...state, items: { ...items }, menu: { ...menu } }
            break;
        }
        case "editItem":

            let items = { ...state.items }
            items[state.itemName] = state.itemPrice
            state = { ...state, items: { ...items } }

            break;
        case "setItemName":
            state = { ...state, itemName: action.itemName }
            break;
        case "setItemPrice":
            state = { ...state, itemPrice: Number(action.itemPrice) }
            break;

        case "setOpen":
            if (action.popupName === "add")
                state = { ...state, addOpen: true }
            if (action.popupName === "edit")
                state = { ...state, editOpen: true }
            if (action.popupName === "category")
                state = { ...state, categoryOpen: true }
            break;
        case "setCategory":
            state = { ...state, category: action.category }
            break;
        case "setClose":
            if (action.popupName === "add")
                state = { ...state, addOpen: false }
            if (action.popupName === "edit")
                state = { ...state, editOpen: false }
            if (action.popupName === "category")
                state = { ...state, categoryOpen: false }
            break;
        default:
    }
    return state;
};