import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
  },
  link: {
    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
  createCard: {
    marginRight: 'auto',
    marginLeft: '2vw',
    '&:hover': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default styles;
