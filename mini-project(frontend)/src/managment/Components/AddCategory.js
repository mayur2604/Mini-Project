import React from "react"
import Box from '@material-ui/core/Box';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
export default (props) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" style={{ width: '100%', height: '100%' }}>
            <Box component="div"
                boxShadow={3}
                bgcolor="#e6e6e6" mt={7} p={2}
                style={{ width: '100%', height: '100%' }}>
                <Box pb={4} fontWeight="fontWeightBold" fontSize="h6.fontSize" display="flex"
                    justifyContent="center"
                    alignItems="center">
                    Add Category
                    </Box>
                <Box component="div"
                    display="flex" justifyContent="center" alignItems="center"
                    style={{ width: '100%', height: '100%' }}>
                    <AddCircleOutlineIcon onClick={()=>props.setOpen("category")}/></Box>
            </Box>
        </Box>
    );
}