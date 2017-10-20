import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import semver from 'semver';
import constants from '../../constants.json';

/**
 * Time to check update after start
 */
const TIME_CHECK_UPDATE = 1e4; // 10 sec.
/**
 * Time will next alert after dissmiss updates
 */
const NEXT_ALERT_TIME = 1e3 * 60 * 60 * 24 * 7;

class AppUpdater extends React.Component {
  state = {
    updates: null,
    acceptedUpdates: false,
  };

  componentDidMount() {
    this.timeoutCheckUpdate = setTimeout(this.handleCheckUpdate, TIME_CHECK_UPDATE);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutCheckUpdate);
  }

  handleCheckUpdate = async () => {
    try {
      const { ipcRenderer } = window.require('electron');
      const result = await fetch('version.json');
      const assembly = await result.json();
      const serverVersion = assembly['app-desktop'].version;

      ipcRenderer.on(constants.ipcVersionEvent, (sender, currentVersion) => {
        if (semver.gt(serverVersion, currentVersion)) {
          this.setState({
            updates: assembly['app-desktop'],
          });
        }
      });
      ipcRenderer.send(constants.ipcVersionEvent);
    } catch (err) {
      console.log(err);
    }
  };

  handleDeclineUpdates = () => {
    const { updates } = this.state;
    localStorage.setItem('updates', JSON.stringify({ ...updates, nextAlert: Date.now() + NEXT_ALERT_TIME }));
    this.forceUpdate();
  };

  handleAcceptUpdates = () => {
    const { updates } = this.state;
    const { shell } = window.require('electron');
    shell.openExternal(updates['update-url']);

    this.setState({
      acceptedUpdates: true,
    });
  };

  render() {
    const { updates, acceptedUpdates } = this.state;
    const storageUpdates = JSON.parse(localStorage.getItem('updates') || '{}');

    if (
      ((storageUpdates.nextAlert && storageUpdates.nextAlert < Date.now()) ||
        !storageUpdates.nextAlert) &&
      updates &&
      !acceptedUpdates
    ) {
      return (
        <Dialog open>
          <DialogTitle>Доступна новая версия {updates.version} </DialogTitle>
          <DialogContent>
            <DialogContentText>{updates.description}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeclineUpdates} color="primary">
              Закрыть
            </Button>
            <Button onClick={this.handleAcceptUpdates} color="primary">
              Скачать новую версию
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return null;
  }
}

export default AppUpdater;
