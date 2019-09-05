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
    CheckCircle,
    Add
} from '@material-ui/icons';
import { SYSTEM_ROUTES } from '../../constants';
import { getSchedules, getRooms } from '../../services';
import moment from 'moment';

export default function RoomListScreen(props) {
    const classes = useStyles();
    const [room, setRoom] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [roomList, setRoomList] = React.useState([]);
    const [loadingList, setLoadingList] = React.useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (params) => {
        let schedulesList = await getSchedules() || [];
        let roomsList = await getRooms(params) || [];
        let newRoomList = [];
        roomsList.data.map((room) => {
            let objScheduling = schedulesList.data.find((scheduling) => scheduling.roomsId === room.id);
            let data = '';
            if (objScheduling) {
                data = moment(objScheduling.created, 'YYYY-MM-DD').format('DD/MM/YYYY');
            }
            newRoomList = [
                ...newRoomList,
                {
                    id: room.id,
                    titulo: room.title,
                    sala: room.room,
                    status: room.status,
                    data: data
                }
            ]
        });
        setRoomList(newRoomList);
        setLoadingList(false);
    };

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

    useEffect(() => {
        _fetchList();
    }, [room]);

    function _onChangeFilter(value) {
        setRoom(value)
    };

    function _fetchList() {
        setLoadingList(true);
        fetchData(parseInt(room));
    };

    return (
        <div className={classes.container}>
            <main>
                <div className={classes.searchDiv}>
                    <TextField
                        label="Filtrar pelo número da sala..."
                        value={room}
                        onChange={(evt) => _onChangeFilter(evt.target.value)}
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
                        {
                            !loadingList &&
                            <TableBody>
                                {roomList.map(row => (
                                    <TableRow key={row.sala}>
                                        <TableCell>{row.titulo}</TableCell>
                                        <TableCell align="right">{row.sala}</TableCell>
                                        <TableCell align="right">{row.data}</TableCell>
                                        <TableCell align="right">
                                            <Fab
                                                size="small"
                                                color="primary"
                                                onClick={() => props.history.push(SYSTEM_ROUTES.ROOM_DETAILS.routeTo, { roomSelected: row })}
                                                disabled={!(!!row.status)}
                                            >
                                                <Search />
                                            </Fab>
                                        </TableCell>
                                        <TableCell align="right">{_renderStatus(row.status)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        }
                    </Table>
                </Paper>
                {loadingList &&
                    <div className={classes.loadingList}>
                        <CircularProgress disableShrink />
                    </div>
                }
                <Fab
                    aria-label='Add'
                    className={classes.fab}
                    color="primary"
                    onClick={() => props.history.push(SYSTEM_ROUTES.CREATE_ROOM.routeTo)}
                >
                    <Add />
                </Fab>
            </main>
        </div >
    )
};
