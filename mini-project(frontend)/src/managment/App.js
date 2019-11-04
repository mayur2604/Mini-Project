/* eslint-disable no-restricted-globals */
import React from 'react';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from "./Components/Popup";
import EditPopup from "./Components/EditPopup";
import FoodCategories from "./Components/foodCategories"
import Tables from "./Components/Tables"
import Bill from "./Components/Bill"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from "axios";
import AddCategory from "./Components/AddCategory"
import CategoryPopup from './Components/CategoryPopup';
import { Button } from '@material-ui/core';
class App extends React.Component {
  componentDidMount() {
    axios.get("http://localhost:8080/menu").then((res) => {
      console.log(res.data);
      this.props.createMenu(res.data)
    });
    axios.get("http://localhost:8080/tables").then((res) => {
      console.log(res.data);
      this.props.createTables(res.data)
    });
    axios.get("http://localhost:8080/bills").then((res) => {
      console.log(res.data);
      {this.props.createBills(res.data)}
    });
    setInterval(() => {
      axios.get("http://localhost:8080/bills").then((res) => {
        console.log(res.data);
        {this.props.createBills(res.data)}
      });
    }, 1000);
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={12} >
          <Paper style={{ backgroundColor: "#e6e6e6" }}>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Menu" />
              <Tab label="Tables" />
              <Tab label="Bills" />
            </Tabs>
            <Button onClick={()=>this.props.logout()}>Logout</Button>
          </Paper>
          <Box width={1} display="flex"
            justifyContent="center"
            alignItems="center" fontSize="h3.fontSize" mx="auto" p={1} fontFamily="Normal">Menu</Box>

          <FoodCategories menu={this.props.menu}
            setCategory={this.props.setCategory}
            setOpen={this.props.setOpen}
            items={this.props.items}
            setItemName={this.props.setItemName}
            setItemPrice={this.props.setItemPrice}
            deleteItem={this.props.deleteItem}
            editItem={this.props.editItem}
            deleteCategory={this.props.deleteCategory}
          />

        </Grid>
        <AddCategory setOpen={this.props.setOpen} />
        <Divider light />

        <Popup setOpen={this.props.setOpen}
          open={this.props.addOpen}
          setItemName={this.props.setItemName}
          setItemPrice={this.props.setItemPrice}
          addItem={this.props.addItem}
          setClose={this.props.setClose}
          itemName={this.props.itemName}
          itemPrice={this.props.itemPrice}
          category={this.props.category}
        />
        <EditPopup setOpen={this.props.setOpen}
          open={this.props.editOpen}
          setItemPrice={this.props.setItemPrice}
          editItem={this.props.editItem}
          setClose={this.props.setClose}
          itemName={this.props.itemName}
          itemPrice={this.props.itemPrice}
        />
        <CategoryPopup
          setOpen={this.props.setOpen}
          open={this.props.categoryOpen}
          setCategory={this.props.setCategory}
          setClose={this.props.setClose}
          addCategory={this.props.addCategory}
          category={this.props.category}
        />
        <Box p={3} />

        <Grid container spacing={3} >
          <Box width={1} display="flex"
            justifyContent="center"
            alignItems="center" fontSize="h3.fontSize" mx="auto" p={1} fontFamily="Normal">Tables</Box>
          <Tables tables={this.props.tables}
            deleteTable={this.props.deleteTable}
          />
          <Grid item lg={2} md={4} xs={6} sm={7}>
            <Box component="div"
              boxShadow={3}
              bgcolor="#e6e6e6" display="flex" justifyContent="center" alignItems="center"
              style={{ width: '100%', height: '100%' }}>
              <AddCircleOutlineIcon onClick={() => this.props.addTable(this.props.tables.length + 1)} />
            </Box>
          </Grid>
        </Grid>
        <Box m={3} />
        <Grid container>
        <Box width={1} display="flex"
            justifyContent="center"
            alignItems="center" fontSize="h3.fontSize" mx="auto" p={1} fontFamily="Normal">Bills</Box>
        <Bill bills={this.props.bills} items={this.props.items}/> </Grid>
        
      </Grid >

    );
  }
}
const mapStateToProps = (state) => {

  return {
    tables: state.modifyTable.tables,
    items: state.modifyItem.items,
    menu: state.modifyItem.menu,
    addOpen: state.modifyItem.addOpen,
    editOpen: state.modifyItem.editOpen,
    itemName: state.modifyItem.itemName,
    itemPrice: state.modifyItem.itemPrice,
    category: state.modifyItem.category,
    categoryOpen: state.modifyItem.categoryOpen,
    bills: state.modifyTable.bills
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
    createBills: (bills) => {
      dispatch({ type: "createBills", bills })
    },
    addTable: (tableId) => {
      axios.post("http://localhost:8080/table", { tableId: tableId, amount: 0, noOfItems: 0 }).then(() => {
        dispatch({ type: "createTable" });
      })
    },
    deleteTable: () => {
      var deleteOrNot = confirm("Do You Really Want to delete it?");
      if (deleteOrNot === true) {
        axios.delete("http://localhost:8080/table").then(() => {
          dispatch({ type: "deleteTable" });
        })
      }
    },
    setCategory: (category) => {
      dispatch({ type: "setCategory", category });
    },
    setItemName: (itemName) => {
      dispatch({ type: "setItemName", itemName });
    },
    setItemPrice: (itemPrice) => {
      dispatch({ type: "setItemPrice", itemPrice });
    },
    addCategory: (category) => {
      axios.post(`http://localhost:8080/category/${category}`).then(() => {
        dispatch({ type: "createCategory" })
      })
    },
    deleteCategory: (category) => {
      axios.delete(`http://localhost:8080/category/${category}`).then(() => {
        dispatch({ type: "deleteCategory", category })
      })
    },
    addItem: (itemName, itemPrice, category) => {
      axios.post("http://localhost:8080/item",
        { itemName: itemName, itemPrice: itemPrice, itemCategory: category }
      ).then(() => {
        dispatch({ type: "createItem" });
      });
    },
    deleteItem: (itemName, itemCategory) => {
      var deleteOrNot = confirm("Do You Really Want to delete it?");
      if (deleteOrNot === true) {
        axios.delete(`http://localhost:8080/item/${itemName}`).then(() => {
          dispatch({ type: "deleteItem", itemName, itemCategory });
        });
      }
    },
    editItem: (itemName, itemPrice) => {
      axios.put(`http://localhost:8080/item/${itemPrice}/${itemName}`).then(() => {
        dispatch({ type: "editItem" });
      })

    },
    setOpen: (popupName) => {
      dispatch({ type: "setOpen", popupName });
    },

    setClose: (popupName) => {
      dispatch({ type: "setClose", popupName });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);