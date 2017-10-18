import { node } from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      '@media print': {
        background: theme.palette.common.white,
      },
    },
  },
});

const Wrapper = ({ children }) => children;

Wrapper.propTypes = {
  children: node.isRequired,
};

export default withStyles(styles)(Wrapper);
