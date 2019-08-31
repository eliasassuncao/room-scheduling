import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    container: {
        margin: '10%'
    },
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));