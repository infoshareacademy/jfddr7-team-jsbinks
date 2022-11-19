import { Link, Typography } from '@mui/material';

export const Copyright = (props: any) => {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/infoshareacademy/jfddr7-team-jsbinks">
        JS-Binks Sp z o.o.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}