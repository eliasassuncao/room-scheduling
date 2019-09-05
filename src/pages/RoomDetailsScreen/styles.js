import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        padding: '3%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    container: {
        margin: '10%'
    },
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divFab: {
        marginTop: 30,
    },
    snack: {
        backgroundColor: 'green',
    }
}));