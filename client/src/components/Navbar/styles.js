import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  mrAuto: {
    marginRight: 'auto',
    marginLeft: '2vw',
    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default styles;
