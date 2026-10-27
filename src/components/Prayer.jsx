import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function Prayer({ name, time, img }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="140" image={img} />
      <CardContent>
        <h2>{name}</h2>

        <h1 variant="h1" sx={{ color: "text.secondary" }}>
          {time}
        </h1>
      </CardContent>
    </Card>
  );
}
