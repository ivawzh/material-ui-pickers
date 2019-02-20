import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Code from './Code';
import { withUtilsService } from './UtilsServiceContext';
import CodeIcon from '@material-ui/icons/Code';
import { Typography, IconButton, withStyles, Collapse } from '@material-ui/core';

class Example extends PureComponent {
  state = {
    sourceExpanded: false,
  };

  getSource = () => require(`!raw-loader!../pages/${this.props.sourceFile}`);

  getComponent = () => require(`../pages/${this.props.sourceFile}`).default;

  toggleSource = () => {
    this.setState({ sourceExpanded: !this.state.sourceExpanded });
  };

  render() {
    const { sourceExpanded } = this.state;
    const { classes, title, description } = this.props;
    // make each component rerender on utils change
    const Component = withUtilsService(this.getComponent());

    return (
      <React.Fragment>
        <Typography variant="subtitle1" gutterBottom>
          {description}
        </Typography>

        <Collapse key="code" in={sourceExpanded}>
          <Code className={classes.source} children={this.getSource()} />
        </Collapse>

        <div className={classes.pickers}>
          <IconButton className={classes.sourceBtn} onClick={this.toggleSource}>
            <CodeIcon />
          </IconButton>
          <Component />
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  exampleTitle: {
    marginBottom: 8,
    '@media(max-width: 600px)': {
      marginLeft: 5,
    },
  },
  pickers: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 160,
    paddingTop: 40,
    width: '100%',
    margin: '0 auto 50px',
    position: 'relative',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',

      '& > div': {
        marginBottom: 32,
      },
    },
  },
  sourceBtn: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  source: {
    marginBottom: 0,
  },
});

export default withStyles(styles)(Example);