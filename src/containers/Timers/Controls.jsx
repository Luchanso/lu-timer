import React from 'react';
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

export default withStyles(styles)(Controls);
