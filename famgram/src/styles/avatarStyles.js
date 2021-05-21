import { makeStyles } from '@material-ui/core/styles';

export const useStyles2 = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid lightgray",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "7px",
    outline: "none"
  },
  layout: {
    padding: "1rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"

  }
}));

export const useStyles1 = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid lightgray",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "7px",
    outline: "none"
  },
  layout: {
    padding: "1rem",
    fontSize: "1.2rem",
    borderBottom: "1px solid lightgray",
    width:"100%",
  }
}));

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  largest: {
    width: theme.spacing(21),
    height: theme.spacing(21),
  },
}));
