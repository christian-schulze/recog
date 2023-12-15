import { ChangeEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export interface AppToolbarProps {
  editorEnabled: boolean;
  setEditorEnabled: (checked: boolean) => void;
}

function AppToolbar({ editorEnabled, setEditorEnabled }: AppToolbarProps) {
  const { logout, user } = useAuth0();

  const classes = useStyles();

  const handleClickLogout = () => {
    logout();
  };

  const handleChangeEditorEnabledSwitch = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    window.localStorage.setItem(
      `${user?.sub}:editorEnabled`,
      checked.toString(),
    );
    setEditorEnabled(checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Recog
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={editorEnabled}
                onChange={handleChangeEditorEnabledSwitch}
                name="editorEnabledSwitch"
                color="secondary"
              />
            }
            label="Enable Edit Mode"
          />
          <Button color="inherit" onClick={handleClickLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { AppToolbar };
