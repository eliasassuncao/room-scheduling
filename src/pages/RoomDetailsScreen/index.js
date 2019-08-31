import React, { UserState, useEffect } from "react";
import { useStyles } from './styles';
import {
    Paper,
    Typography
} from '@material-ui/core';

export default function RoomDetailsScreen() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <main className={classes.main}>
                <Paper className={classes.root}>
                    <Typography >Detalhes da sala</Typography>
                </Paper>
            </main>
        </div>
    )
};
