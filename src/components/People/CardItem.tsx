import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
} from "@mui/material";
import { Person } from "../../utils/interfaces";
import { ButtonElement } from "../Button";
import he from "he";
import { btnColor, btnSize, btnVariant } from "../../utils/enum";

type Prop = {
  person: Person;
};

export default function CardItem({ person }: Prop) {
  const categories: string[] = [];

  const btnAction = () => {
    window.open(`https://greet.bg/?add-to-cart=${person.id}`);
  };

  const name = he.decode(person.name);

  const descriptionRegex = /<\s*\/?\s*p\s*>|<\s*br\s*\/\s*>/gm;
  let description = he
    .decode(person.short_description)
    .replace(descriptionRegex, "");
  const imageUrl = person.images.map((image) => image.src);

  if (description.length > 150) {
    description = description.substring(0, 150) + "...";
  }

  person.categories.map((category) => {
    categories.push(category.name);
  });

  return (
    <Card variant="outlined" sx={{ placeItems: "center" }}>
      <CardMedia
        component="img"
        alt="Your Image"
        image={imageUrl.toString().replace("-324x324", "")}
      />
      <CardContent sx={{ height: "4rem" }}>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ height: "5rem" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardContent sx={{ height: "2rem", marginTop: "2rem" }}>
        {categories.join(", ")}
      </CardContent>
      <CardActions sx={{ marginTop: "4rem", justifyContent: "center" }}>
        <ButtonElement
          text="Add To Cart"
          color={btnColor.SUCCESS}
          action={btnAction}
          size={btnSize.MEDIUM}
          variant={btnVariant.CONTAINED}
          
        />
      </CardActions>
    </Card>
  );
}
