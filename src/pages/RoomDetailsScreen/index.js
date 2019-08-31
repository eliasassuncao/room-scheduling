import React, { UserState, useEffect } from "react";
import { useStyles } from './styles';
import {
    Paper,
    Typography,
    Fab,

} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function RoomDetailsScreen() {
    const [selectedDate, setSelectedDate] = React.useState();
    const [formatedDate, setFormatedDate] = React.useState();
    const classes = useStyles();

    useEffect(() => {
        console.log(selectedDate, "<=== afea")
        let dateSelected = new Date(selectedDate);
        let day = dateSelected.getDate().toString();
        let month = (dateSelected.getMonth() + 1).toString();
        let year = dateSelected.getFullYear().toString();
        let newValue = day + month + year;
        console.log(newValue, "<--- new")
        //setFormatedDate()
    }, [selectedDate]);

    return (
        <div className={classes.container}>
            <main className={classes.main}>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">Sala 1</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Data"
                            value={selectedDate}
                            onChange={(value) => setSelectedDate(value)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <div className={classes.divFab} >
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                        >
                            Agendar
                        </Fab>
                    </div>
                </Paper>
            </main>
        </div>
    )
};
