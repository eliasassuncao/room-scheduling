import React, { UserState, useEffect } from "react";
import { useStyles } from './styles';
import {
    Paper,
    Typography,
    Fab,
    CircularProgress,
    Snackbar,
    SnackbarContent
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { addSchedules } from '../../services';

export default function RoomDetailsScreen(props) {
    const [selectedDate, setSelectedDate] = React.useState();
    const [selectedRoom, setSelectedRoom] = React.useState([]);
    const [loadingRoomSelected, setLoadingRoomSelected] = React.useState(true);
    const [toastSuccess, setToastSuccess] = React.useState(false);

    const classes = useStyles();

    useEffect(() => {
        let roomSelected = props.location.state.roomSelected;
        setSelectedRoom(roomSelected)
    }, []);

    useEffect(() => {
        setLoadingRoomSelected(false);
    }, [selectedRoom]);


    function scheduleRoom() {
        let date = moment(selectedDate).format('YYYY-MM-DD');
        let dataToSend = {
            created: date,
            roomsId: selectedRoom.id
        };
        addSchedules(dataToSend)
            .then(() => {
                setToastSuccess(true);
                props.history.push('/')
            })
            .catch(err => console.log(err))
    };

    return (
        <div className={classes.container}>
            <main className={classes.main}>
                <Paper className={classes.root}>
                    {
                        loadingRoomSelected ?

                            <CircularProgress disableShrink />
                            :
                            <div>
                                <Typography variant="h5" component="h3">{selectedRoom.titulo}</Typography>
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
                                        onClick={() => scheduleRoom()}
                                    >
                                        Agendar
                                    </Fab>
                                </div>
                            </div>
                    }
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={toastSuccess}
                    autoHideDuration={6000}
                    className={classes.snack}
                    onClose={() => setToastSuccess(false)}
                    message={<span> Sala {selectedRoom.sala} agendanda com sucesso!</span>}

                />

            </main>
        </div>
    )
};
