import React from 'react';
import { shape, string, func } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styles = {
  button: {
    marginRight: 16,
  },
};

const Controls = ({ classes, theme, onChangeTheme }) => (
  <div>
    <FormGroup row>
      <Button raised color="primary" className={classes.button}>
        Настройки
      </Button>
      <Button raised color="primary" className={classes.button}>
        Экспорт CSV
      </Button>
      <FormControlLabel
        control={
          <Switch
            checked={theme === 'dark'}
            onChange={() => {
              onChangeTheme();
            }}
          />
        }
        label="Тёмная тема"
      />
    </FormGroup>
  </div>
);

Controls.propTypes = {
  classes: shape({
    button: string,
  }).isRequired,
  // eslint-disable-next-line react/no-typos
  onChangeTheme: func.isRequired,
  theme: string,
};

Controls.defaultProps = {
  theme: 'light',
};

export default withStyles(styles)(Controls);
