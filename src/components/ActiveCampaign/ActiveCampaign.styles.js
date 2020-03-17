import { createStyles } from '@material-ui/styles';

export default ({ shape, palette, breakpoints }) => createStyles({
  section: {
    margin                  : 44,
    maxWidth                : 1440,
    [breakpoints.down('sm')]: {
      margin       : 16,
      marginBottom : 24,
      '& button, a': {
        width: '100%',
      },
    },
  },
  work: {
    display     : 'flex',
    minHeight   : 54,
    marginBottom: 14,
  },
  fileMusicIcon: {
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
    margin        : '8px 16px 8px 0',
    '& svg'       : {
      fill  : 'url(#FileMusicIconGradient)',
      height: 36,
      width : 30,
    },
  },
  actions: {
    '& a, button': {
      marginRight: 16,
    },
    marginBottom: 16,
  },
});
