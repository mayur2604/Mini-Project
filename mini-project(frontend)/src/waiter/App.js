import React from 'react';
import Table from "./components/Table";
import { ListItem, List, ListItemText, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FoodItem from "./components/FoodItem";
import { connect } from "react-redux";
import Box from '@material-ui/core/Box';
import axios from "axios";
class App extends React.Component {
  componentWillMount() {
    axios.get("http://localhost:8080/menu").then((res) => {
      console.log(res.data);
      this.props.createMenu(res.data)
    });
    axios.get("http://localhost:8080/tables").then((res) => {
      console.log(res.data);
      this.props.createTables(res.data)
    });
    axios.get("http://localhost:8080/preparingOrders").then((res) => {
      console.log(res.data);
      this.props.createOrder(res.data)
    });
    setInterval(() => {
      // axios.get("http://localhost:8080/menu").then((res) => {
      //   console.log(res.data);
      //   this.props.createMenu(res.data)
    
      // axios.get("http://localhost:8080/tables").then((res) => {
      //   console.log(res.data);
      //   this.props.createTables(res.data)
      
      axios.get("http://localhost:8080/preparingOrders").then((res) => {
        console.log(res.data); this.props.createOrder(res.data)
      });
    }, 1000);
  }
  render() {
    let tables = this.props.tables;
    let menu = this.props.menu;

    const foodCategories = Object.entries(menu).map(([category, items]) => {

      const food_items = items.map((item) => (
        <Grid item lg={2} md={4} sm={6} xs={7} >
          <FoodItem name={item} price={this.props.items[item]} dragItem={this.props.dragItem} />
        </Grid>
      ));
      return (<Box>
        <Box width={1} fontSize="h4.fontSize" mx="auto" p={1} fontFamily="Normal">{category}</Box>
        <Grid container spacing={2} >{food_items}</Grid>
      </Box>);


    });
    const Tables = Object.entries(tables).map(([table_no, table_info]) => (

      <ListItem id={table_no}>
        <ListItemText px={2}>
          <Table
            no={table_no}
            no_of_items={table_info.no_of_items}
            amt={table_info.amt}
            orders={table_info.orders}
            items={this.props.items}
            dropItem={this.props.dropItem}
            modifyOrder={this.props.modifyOrder}
            deleteOrder={this.props.deleteOrder}
            itemName={this.props.draggedItem}
            itemPrice={this.props.itemPrice}
            open={this.props.open}
            setOpen={this.props.setOpen}
            closeSession={this.props.closeSession}
          />
        </ListItemText>
      </ListItem>
    )
    );
    return (
      <Grid container direction="row" justify="flex-start" spacing={3} >
        <Grid item lg={2} md={3} sm={4} xs={5}>
          <Box fontSize="h4.fontSize" mx="auto" p={1} fontFamily="Normal">Tables</Box>
          <List >
            {Tables}
          </List>
        </Grid>
        <Divider orientation="vertical" />

        <Grid lg={9} item md={8} sm={7} xs={6}>
          {foodCategories}
        </Grid>
        <Divider orientation="vertical" />
        <Button onClick={()=>this.props.logout()}>Logout</Button>
      </Grid>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    items: state.items,
    menu: state.menu,
    draggedItem: state.draggedItem,
    itemPrice: state.itemPrice,
    open: state.open
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createMenu: (menu) => {
      dispatch({ type: "createMenu", menu })
    },
    createTables: (tables) => {

      dispatch({ type: "createTables", tables })
    },
    createOrder: (orders) => {
      dispatch({ type: "createOrder", orders })
    },
    dragItem: (itemName, itemPrice) => {
      dispatch({ type: "dragItem", itemName, itemPrice: Number(itemPrice) });
    },
    dropItem: (tableNo, itemName, itemPrice, quantity, amount, noOfItems) => {
      console.log(tableNo, itemName, itemPrice, quantity, amount, noOfItems);
      let req="new"
      axios.post(`http://localhost:8080/order/${tableNo}/${amount + itemPrice}/${noOfItems + 1}/${req}`,
        {
          itemName,
          quantity: Number(quantity) + 1,
          tableId: tableNo,
          status:"preparing"
        }).then(() => {
          dispatch({ type: "dropItem", tableNo });
        })
    },
    modifyOrder: (tableNo, itemName, quantity, itemPrice, amount, noOfItems, finalQuantity) => {
      let req="old"
      axios.post(`http://localhost:8080/order/${tableNo}/${amount + itemPrice * quantity}/${noOfItems + quantity}/${req}`,
        {
          itemName,
          quantity: finalQuantity,
          tableId: tableNo,
          status:"preparing"
        }).then((res) => {
          console.log(res.data);
          if(res.data!==false)
          dispatch({ type: "modifyOrder", tableNo, itemName, quantity });
        })
    },
    deleteOrder: (table_no, item, quantity, itemPrice) => {
      console.log(table_no, item, quantity, itemPrice);
      axios.post(`http://localhost:8080/order/${itemPrice}`, { quantity: quantity, tableId: table_no, itemName: item }).then(() => {
        dispatch({ type: "deleteOrder", table_no, item });
      })
    },
    setOpen: () => {
      dispatch({ type: "setOpen" })
    },
    closeSession:(tableId)=>{
      axios.post(`http://localhost:8080/closeSession/${tableId}`).then(()=>{
        dispatch({type:"closeSession",tableId})
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
