import React, { UserState, useEffect } from "react";
import { useStyles } from './styles';
import {
    Paper,
    TextField,
    Typography,
    Fab,
    Snackbar
} from '@material-ui/core';
import { addRoom } from '../../services';

export default function CreateRoomScreen(props) {
    const [title, setTitle] = React.useState('');
    const [room, setRoom] = React.useState('');
    const classes = useStyles();
    const [toastSuccess, setToastSuccess] = React.useState(false);

    function _onSubmit() {
        let data = {
            title: title,
            room: room,
            status: 1
        };
        addRoom(data)
            .then(() => {
                setToastSuccess(true);
                setTimeout(() => {
                    props.history.push('/')
                }, 2000)
            })
            .catch(err => console.log(err))
    };

    return (
        <div className={classes.container}>
            <main className={classes.main}>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">Criar Sala</Typography>
                    <TextField
                        label="Título"
                        onChange={(evt) => setTitle(evt.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Sala"
                        onChange={(evt) => setRoom(evt.target.value)}
                        margin="normal"
                        type="number"
                    />
                    <div className={classes.divFab} >
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={() => _onSubmit()}
                        >
                            Criar Sala
                        </Fab>
                    </div>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={toastSuccess}
                    autoHideDuration={6000}
                    onClose={() => setToastSuccess(false)}
                    message={<span> Sala criada com sucesso!</span>}

                />
            </main>
        </div>
    )
};
