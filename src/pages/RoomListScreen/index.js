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
} from '@material-ui/core';
import {
    Search
} from '@material-ui/icons';
import { SYSTEM_ROUTES } from '../../constants';

function createData(titulo, sala, data, status) {
    return { titulo, sala, data, status };
}

const rows = [
    createData('titulo', 102, '15/09/2019', 'Disponivel'),
    createData('titulo', 237, '15/09/2019', 'Indisponivel'),
    createData('titulo', 262, '15/09/2019', 'Indisponivel'),
    createData('titulo', 305, '15/09/2019', 'Disponivel'),
    createData('titulo', 356, '15/09/2019', 'Disponivel'),
];

export default function RoomListScreen(props) {
    const classes = useStyles();
    const [room, setRoom] = React.useState('');
    return (
        <div className={classes.container}>
            <main>
                <TextField
                    label="Filtrar sala..."
                    value={room}
                    onChange={(evt) => setRoom(evt.target.value)}
                    margin="normal"
                    className={classes.inputSearchRoom}
                />
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
                                        >
                                            <Search />
                                        </Fab>
                                    </TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </main>
        </div>
    )
};
