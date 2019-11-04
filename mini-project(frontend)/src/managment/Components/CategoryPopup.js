import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';
export default (props) => {
    return (<Modal open={props.open} onClose={props.setClose} >
        <Box component="div"
            boxShadow={3} position="relative" left="35%" top="35%"
            bgcolor="#e6e6e6"
            style={{ width: '30%', height: '30%' }}>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center">
                <br></br>
                <TextField
                    id="outlined-name"
                    label="categoryName"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => props.setCategory(e.target.value)}
                />
                <br></br>
                <Button variant="contained" color="primary" onClick={() => {
                   props.addCategory(props.category); props.setClose("category");
                }}>
                    OK</Button>
            </Grid>
        </Box>
    </Modal>
    );
};