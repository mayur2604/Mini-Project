import React from "react";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ListItem, List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
const Bill = (props) => {
    const bills = Object.entries(props.bills).map(([id, bill]) => {
        console.log(bill);
        const items = (bill.orders).map((order) => (
            <ListItem>
                <Box mx="auto" fontSize="h6.fontSize" display="flex" >
                    {order.itemName}
                </Box>
                <Box   mx="auto" fontSize="h6.fontSize" >
                    {props.items[order.itemName]}
                </Box >
                <Box mx="auto" fontSize="h6.fontSize" >
                    {order.quantity}
                </Box>

            </ListItem>
        ));
        return (<Grid item  lg={3} md={5} xs={7} sm={8}>
            <Box boxShadow={3}
                bgcolor="#e6e6e6">
                <Box px={1} mx="auto" fontSize="h6.fontSize" display="flex" justifyContent="center">Table No - {id} </Box>
                <Box p={1} width={1} mx="auto" fontWeight="fontWeightMedium" fontSize="h5.fontSize" display="flex" justifyContent="center">Order Details</Box>

                <List>
                    <ListItem>
                        <Box  mx="auto" fontWeight="fontWeightMedium" fontSize="h6.fontSize" display="flex" justifyContent="center">NAME</Box>
                        <Box  mx="auto" fontWeight="fontWeightMedium" fontSize="h6.fontSize" display="flex" justifyContent="center">PRICE</Box>
                        <Box  mx="auto" fontWeight="fontWeightMedium" fontSize="h6.fontSize" display="flex" justifyContent="center">SERVINGS</Box>
                    </ListItem>
                    {items}
                      <Box display="flex" justifyContent="center">  
                    <ListItem><Box display="flex" fontWeight="fontWeightMedium" fontSize="h6.fontSize" justifyContent="center">NoOfItems-{bill.noOfItems}</Box></ListItem>
                    <ListItem><Box display="flex" fontWeight="fontWeightMedium" fontSize="h6.fontSize" justifyContent="center">Total Amount-{bill.amount}</Box></ListItem>
                    </Box></List>
            </Box>
        </Grid>);
    });
    return (
        // <Card >
        //     <CardContent>
        //         <Typography color="textSecondary" >
        //             Bill
        //      </Typography>
        <Grid container spacing={5} >
            {bills}

        </Grid>
        //     </CardContent>
        // </Card>
    );
}
export default Bill