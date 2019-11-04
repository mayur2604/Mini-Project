import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
class FoodItem extends React.Component {
    render() {
        return (
            <Box component="div"
                boxShadow={3}
                bgcolor="#e6e6e6"
                style={{ width: '100%', height: '100%' }}>
                <Typography>
                    <Box pb={4} fontWeight="fontWeightBold" fontSize="h6.fontSize">
                        Table-{this.props.no}
                        <Grid container
                            direction="row"
                            justify="flex-end"
                            alignItems="center">
                            <DeleteIcon onClick={this.props.deleteTable} />
                        </Grid>
                    </Box>
                    <Box fontWeight="fontWeightMedium" >
                        Rs-{this.props.amt} |
                        Total Items-{this.props.no_of_items}
                    </Box>
                </Typography>
            </Box>
        );
    }

}
export default FoodItem;