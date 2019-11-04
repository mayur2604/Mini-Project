import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
function onDrag(e, prop) {
    e.preventDefault();
    prop.dragItem(prop.name,prop.price);
}
class FoodItem extends React.Component {
    render() {
        return (
            <div draggable onDrag={(e) => onDrag(e, this.props)} >
                <Box component="div" boxShadow={3}
                    bgcolor="#e6e6e6"
                    
                    style={{ width: '100%', height: '100%' }}>
                    <Typography>
                        <Box pb={4} fontWeight="fontWeightBold" fontSize="h6.fontSize">
                            {this.props.name}
                        </Box><Box fontWeight="fontWeightMedium">
                            {this.props.price}
                        </Box>
                    </Typography>
                </Box>
            </div>
        );
    }

}
export default FoodItem;