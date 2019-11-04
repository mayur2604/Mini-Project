import React from 'react';
import Table from "./Table";
import Grid from '@material-ui/core/Grid';
const Tables = (props) => {
    let tables = props.tables;
    const result = tables.map((table_no) => (

        <Grid item lg={2} md={4} xs={6} sm={7} >

            <Table
                no={table_no}
                no_of_items={0}
                amt={0}
                deleteTable={props.deleteTable}
            />

        </Grid>
    )
    );
    return result
}
export default Tables;