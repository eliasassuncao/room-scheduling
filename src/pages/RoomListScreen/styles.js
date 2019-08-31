import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    container: {
        margin: '5%'
    },
    inputSearchRoom: {
        width: '25%'
    },
    iconChecked: {
        color: '#50d724',
        marginRight: 8
    },
    iconCancel: {
        color: '#e30707',
        marginRight: 8
    },
    divStatus: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    searchDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}));