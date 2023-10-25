import { Grid } from "@mui/material";
import { Person } from "../../utils/interfaces";
import CardItem from "./CardItem";

type personInfo = {
  people: Person[];
};

export default function Cards({ people }: personInfo) {
  return people.map((person: Person) => {
    return (
      <Grid item xs={12} sm={6} md={3} key={person.id}>
        <CardItem person={person} key={person.id} />
      </Grid>
    );
  });
}
