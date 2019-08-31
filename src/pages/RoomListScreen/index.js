import React, { UserState, useEffect } from "react";
import { useStyles } from './styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Fab,
    CircularProgress
} from '@material-ui/core';
import {
    Search,
    Cancel,
    CheckCircle
} from '@material-ui/icons';
import { SYSTEM_ROUTES } from '../../constants';

function createData(titulo, sala, data, status) {
    return { titulo, sala, data, status };
}

const rows = [
    createData('titulo', 102, '', 1),
    createData('titulo', 237, '15/09/2019', 0),
    createData('titulo', 262, '15/09/2019', 0),
    createData('titulo', 305, '', 1),
    createData('titulo', 356, '', 1),
];

export default function RoomListScreen(props) {
    const classes = useStyles();
    const [room, setRoom] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    function _renderStatus(status) {
        if (!!status) {
            return (
                <div className={classes.divStatus}>
                    <CheckCircle className={classes.iconChecked} />
                    Disponível
                </div>
            )
        }
        return (
            <div className={classes.divStatus}>
                <Cancel className={classes.iconCancel} />
                Indisponível
            </div>
        )
    };
    function _onChangeFilter(evt) {
        setRoom(evt.target.value)
        setTimeout(() => {
            setLoading(true);
            _fetchList();
        }, 3000)
    };

    function _fetchList() {
        //simulando busca
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    };

    return (
        <div className={classes.container}>
            <main>
                <div className={classes.searchDiv}>
                    <TextField
                        label="Filtrar pelo número da sala..."
                        value={room}
                        onChange={(evt) => _onChangeFilter(evt)}
                        margin="normal"
                        className={classes.inputSearchRoom}
                    />
                    {
                        loading &&
                        <CircularProgress size={20} />
                    }
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell align="right">Sala</TableCell>
                                <TableCell align="right">Data</TableCell>
                                <TableCell align="right">Visualizar Sala</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.sala}>
                                    <TableCell>{row.titulo}</TableCell>
                                    <TableCell align="right">{row.sala}</TableCell>
                                    <TableCell align="right">{row.data}</TableCell>
                                    <TableCell align="right">
                                        <Fab
                                            size="small"
                                            color="primary"
                                            onClick={() => props.history.push(SYSTEM_ROUTES.ROOM_DETAILS.routeTo)}
                                            disabled={!(!!row.status)}
                                        >
                                            <Search />
                                        </Fab>
                                    </TableCell>
                                    <TableCell align="right">{_renderStatus(row.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </main>
        </div>
    )
};
