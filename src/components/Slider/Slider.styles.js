import { createStyles } from '@material-ui/styles';

export default ({ palette }) => createStyles({
  slideButton: {
    backgroundColor: palette.common.white,
    boxShadow      : `0 4px 5px 0 rgba(0,0,0,0.14),
                      0 1px 10px 0 rgba(0,0,0,0.12),
                      0 2px 4px -1px rgba(0,0,0,0.2)`,
    '&:hover': {
      backgroundColor: palette.common.white,
    },
  },
});
