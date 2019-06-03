import React from 'react';

import {
  withStyles,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './styles';

const CardItem = ({ data, user, classes }) => (
  <Card className={classes.card}>
    <CardHeader
      avatar={<Avatar className={classes.avatar}>{user.name.charAt(0)}</Avatar>}
      action={(
        <IconButton>
          <MoreVertIcon />
        </IconButton>
)}
      // subheader={data.date}
      title={data.title}
    />
    <CardMedia
      className={classes.media}
      image={`http://localhost:9000/${data.image}`}
      title={data.title}
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {data.description}
      </Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(CardItem);
