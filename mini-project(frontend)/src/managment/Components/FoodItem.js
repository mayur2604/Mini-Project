import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
class FoodItem extends React.Component {
    render() {
        return (
            <Box component="div" boxShadow={3}
                bgcolor="#e6e6e6"
                style={{ width: '100%', height: '100%' }}>
                <Typography>
                    <Box pb={4} fontWeight="fontWeightBold" fontSize="h6.fontSize">
                        {this.props.name}
                        <Box component="inline"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center">
                            <EditIcon onClick={() =>{
                                this.props.setOpen("edit")
                                this.props.setItemName(this.props.name)
                                }} />
                            <DeleteIcon onClick={() => this.props.deleteItem(this.props.name, this.props.category)} />

                        </Box>
                    </Box>

                    <Box fontWeight="fontWeightMedium">
                        <Box component="inline" fontSize="h6.fontSize"> {this.props.price}</Box>

                    </Box>

                </Typography>
            </Box>
        );
    }

}
export default FoodItem;