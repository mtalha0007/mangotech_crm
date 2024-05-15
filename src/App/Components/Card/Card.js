import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Images } from '../../Assets/Images/Images';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 ,borderRadius:"10px"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          
          sx={{borderRadius:"50%",width:"78px",height:"78px",margin:"10px auto"}}
          image={Images.defaultImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom component="div" sx={{textAlign:"center" ,fontWeight:"600"}}>
            Talha
          </Typography>
          <Typography gutterBottom component="div" sx={{textAlign:"center",fontSize:"14px",}}>
            Talha@gmail.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}