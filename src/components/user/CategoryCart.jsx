import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Container,
  CssBaseline,
  Grid,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { admin } from "../../services/api";
import { styled } from '@mui/material/styles';


const cards = [1, 2, 3, 4, 5, 6,];

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B8291",
    },
  },
});

export default function CategoryCard() {

    const [categoryData, setCategoryData] = useState([])

   useEffect(() => {
    const loadCategory = async() => {
        try {
          const res = await admin.get('category')
          if(res){
            setCategoryData(res.data)
          }
        } catch (error) {
          console.log(error);
        }
      }
      loadCategory()
      
   }, [])


   const StyledCardContent = styled(CardContent)(({ theme }) => ({
    textAlign: 'center',
    textDecoration: 'none',
    color: '#244D61',
  }));


  return (
    <>
        <CssBaseline />
        
        <Container
          component="main"
          sx={{ mt: 8, mb: 2, border: 1, p: 3, textAlign: "center"}}
          maxWidth="lg"
          alignItems={"center"}
        >
          
          <Typography variant="h5" component="h2" gutterBottom>
            {"Most Enrolled Category "}
          </Typography>
          <Typography variant="body1">Most Enrolled Category for you</Typography>
        </Container>
      <CssBaseline />
      <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {categoryData.map((cat) => (
          <Grid item key={cat._id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to={`/filtered/${cat._id}`} style={{ textDecoration: 'none' }}>
                <CardMedia component="img" height="140" image={cat.imageUrl} alt={cat.name} />
                <StyledCardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cat.name}
                  </Typography>
                </StyledCardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}
