import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import pic1 from "../assets/noorder.svg";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useEffect } from "react";

const Ordersummary = () => {
  const defaultTheme = createTheme();

  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "2%",
            }}
          >
            <Typography component="h1" variant="h5">
              Order Details
            </Typography>

            {order.map((item) => (
              <Card
                key={item.order_id}
                style={{ marginTop: 20, textAlign: "center" }}
              >
                <CardContent>
                  <Typography color="textSecondary">
                    Order ID: {item._id}
                  </Typography>
                  <Typography color="textSecondary">
                    Delivery Address:{item.deliveryAddress}{" "}
                  </Typography>

                  {item.items.map((product, index) => (
                    <div key={index}>
                      <Typography variant="h6" color="textSecondary">
                        item:{product.name}
                      </Typography>
                      <Typography color="textSecondary">
                        price:{product.price}
                      </Typography>
                      <Typography color="textSecondary">
                        quantity:{product.quantity}
                      </Typography>
                      <Typography color="textSecondary">
                        category:{product.category}
                      </Typography>
                    </div>
                  ))}

                  <img
                    src={pic1}
                    alt="First"
                    style={{ width: "100%", height: "100%", margin: "0 auto" }}
                  />
                  <button
                    onClick={() => (window.location.href = "/customerReview")}
                  >
                    Go to Customer Review
                  </button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Ordersummary;
