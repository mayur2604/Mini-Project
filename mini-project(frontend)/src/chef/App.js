import React from 'react';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { Button } from '@material-ui/core';
class App extends React.Component {
    componentDidMount() {
        setInterval(() => {
            axios.get("http://localhost:8080/preparingOrders").then((res) => {
                console.log(res.data);
                this.props.createOrder(res.data)

            });
        },1000)
    }

    render() {
        const orders = this.props.orders.map((order) => (
            <Box boxShadow={2} bgcolor="#e6e6e6" pt={2} mt={2}>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                    <Box component="inline" fontSize="h6.fontSize" alignContent="center" >{order.itemName}</Box>
                    <Box component="inline" fontSize="h6.fontSize" alignContent="center">{order.quantity}</Box>
                    <Box component="inline" fontSize="h6.fontSize" alignContent="center">{order.tableId}</Box>
                    <Box component="inline" fontSize="h6.fontSize" alignContent="center">
                        <Button onClick={() => this.props.changeStatus(order.itemName, order.quantity, order.tableId)}>
                            Done
                            </Button>
                    </Box>
                </Grid></Box>
        ))

        return (<Box>
            <Grid container
                direction="row"
                justify="space-between"
                alignItems="center">
                   
                <Box component="inline" fontSize="h6.fontSize" >ITEM-NAME</Box>
                <Box component="inline" fontSize="h6.fontSize">QUANTITY</Box>
                <Box component="inline" fontSize="h6.fontSize">TABLE-NO</Box>
                <Box component="inline" fontSize="h6.fontSize">STATUS</Box>
            </Grid>
            {orders}
            <Button onClick={()=>{this.props.logout()}}>Logout</Button>
        </Box>);

    }
}
const mapStateToProps = (state) => {

    return {
        orders: state.orders,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (orders) => {
            dispatch({ type: "createOrders", orders })
        },
        changeStatus: (itemName, quantity, tableId) => {
            axios.post("http://localhost:8080/status", { itemName, quantity, tableId }).then(()=>{
                dispatch({type:"changeStatus",itemName,tableId})
            })
        }
    }

};
export default connect(mapStateToProps, mapDispatchToProps)(App);