import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "45%", md: "30%", lg: "18%" }, // عرض الكارد يتغير بناءً على حجم الشاشة
        margin: "50px auto", // محاذاة الكارد في المنتصف وإضافة مساحة بين العناصر
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={props.src}
        title={props.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "text.secondary", textAlign: "right" }}
        >
          {props.name}
        </Typography>
        <Typography
          variant="h4"
          sx={{ textAlign: "right" }} // محاذاة النص في المنتصف
        >
          {props.time}
        </Typography>
      </CardContent>
    </Card>
  );
}
