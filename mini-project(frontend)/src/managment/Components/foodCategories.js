import React from 'react';
import FoodItem from "./FoodItem";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
const foodCategories = (props) => {
    let menu = props.menu;
    const res = Object.entries(menu).map(([category, items]) => {

        const foodItems = items.map((item) => (
            <Grid item lg={2} md={4} sm={6} xs={7}>
                <FoodItem
                    name={item}
                    price={props.items[item]}
                    category={category}
                    deleteItem={props.deleteItem}
                    editItem={props.editItem}
                    setOpen={props.setOpen}
                    setItemName={props.setItemName} />
            </Grid>
        ));
        return (<Grid container  spacing={3}>
            <Box width={1} fontSize="h4.fontSize" mx="auto" m={2} fontFamily="Normal" >
            <Box component="inline" pr={2}>{category}</Box>

            <DeleteIcon  onClick={()=>props.deleteCategory(category)} />
            </Box>
          {foodItems}
                <Grid item lg={2} md={4} sm={6} xs={7}>
                   <Box component="div"
                        boxShadow={3} 
                        bgcolor="#e6e6e6" display="flex" justifyContent="center" alignItems="center"
                        style={{ width: '100%', height: '100%' }}>

                        <AddCircleOutlineIcon onClick={() => { props.setOpen("add"); props.setCategory(category) }} />

                    </Box>
                
            </Grid>
           
        </Grid>);
    });
    return  res 
}
export default foodCategories;