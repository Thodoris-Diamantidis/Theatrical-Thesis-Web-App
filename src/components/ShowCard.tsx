import React from "react";
import {
  makeStyles,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import style from "../assets/jss/components/showCardStyle";
import Image from "next/image";
import Link from "next/link";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import useFavoriteShow from "../hooks/useFavoriteShow";
import useWatchlist from "../hooks/useWatchlist";

const useStyles = makeStyles(style);

export interface ShowCardProps {
  id: number;
  title: string;
  media: string;
}

const ShowCard: React.FC<ShowCardProps> = ({ id, title, media }) => {
  const classes = useStyles();

  const { isFavorite, setIsFavorite } = useFavoriteShow(id);
  const { inWatchlist, setInWatchlist } = useWatchlist(id);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleWatchlist = () => {
    setInWatchlist(!inWatchlist);
  };

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardMedia className={classes.cardImg}>
          <Link href={`/shows/${id}`}>
            <a className="linksNoDecoration">
              <div className={classes.imageContainer}>
                <Image
                  src={media ? media : "/DefaultShowImage.jpg"}
                  alt={`${title} thumbnail`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </a>
          </Link>
        </CardMedia>
        <div className={classes.cardTitle}>
          <Link href={`/shows/${id}`}>
            <a className={classes.link}>
              <Tooltip title={title}>
                <Typography variant="body1" component="h2">
                  {title}
                </Typography>
              </Tooltip>
            </a>
          </Link>
        </div>
        <div className={classes.icons}>
          <IconButton
            size="small"
            className={classes.button}
            onClick={handleWatchlist}
          >
            {inWatchlist ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
          </IconButton>
          <IconButton
            size="small"
            className={classes.button}
            onClick={handleFavorite}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </Card>
    </div>
  );
};

export default ShowCard;
