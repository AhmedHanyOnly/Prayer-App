
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const CardPrayer = ({title, time, img}:{title:string, time:string, img:string}) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="prayer-card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="green iguana"
        />
        <img src="" alt="" />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div" className="prayer-text">
            {title}
          </Typography>
          <Typography variant="h1" color="text.secondary" className="time-text">
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardPrayer;
