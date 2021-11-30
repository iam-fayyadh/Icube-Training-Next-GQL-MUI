import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useQuery, ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
// import Card from "@material-ui/core/Card";
import Navbar from "../../../components/Navbar.jsx";
import Butt from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Link from "next/link";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CategoryDetails({ categories }) {
  const router = useRouter();
  const [Cart, setCart] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    let cart = sessionStorage.getItem("Cart");

    if (Cart === null) {
      setCart([]);
    } else {
      let categories = JSON.parse(cart) || [];
      setCart(categories);
    }
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddCart = (item) => {
    if (Cart.length === 0) {
      let arrayItem = [item];
      let savedItem = JSON.stringify(arrayItem);
      sessionStorage.setItem("Cart", savedItem);
    }
    let shoppingCart = Cart;
    shoppingCart.push(item);
    // console.log(shoppingCart);
    let savedItem = JSON.stringify(shoppingCart);
    sessionStorage.setItem("Cart", savedItem);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to California</h1>

          <div className={styles.cardMap}>
            <div>
              {categories.map((categories) => {
                let parse = ReactHtmlParser(categories.description.html);
                return (
                  <div key={categories.id}>
                    <div className={styles.card}>
                      <h2>{categories.name}</h2>
                      <img
                        height={300}
                        width={300}
                        src={categories.image.url}
                      />
                      <h2>Description</h2>
                      {/* <p>{categories.description.html}</p> */}
                      {parse}
                      <h3>Price</h3>
                      <p>
                        Rp.
                        {categories.price_range.maximum_price.final_price.value}
                        ,-
                      </p>

                      <br />

                      <Stack spacing={2} sx={{ width: "100%" }}>
                        <Butt
                          variant="contained"
                          onClick={() => {
                            {
                              handleClick();
                            }
                            {
                              handleAddCart(categories);
                            }
                          }}
                        >
                          + Add To Chart
                        </Butt>
                        <Snackbar
                          open={open}
                          autoHideDuration={6000}
                          onClose={handleClose}
                        >
                          <Alert
                            onClose={handleClose}
                            severity="success"
                            sx={{ width: "100%" }}
                          >
                            Product has Added to Cart!
                          </Alert>
                        </Snackbar>
                      </Stack>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = new ApolloClient({
    uri: "https://b2cdemo.getswift.asia/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query getProduct($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
          items {
            id
            name
            __typename
            description {
              html
            }
            image {
              url
            }
            price_range {
              maximum_price {
                final_price {
                  value
                }
                regular_price {
                  value
                }
              }
            }
            qty_available
            rating_summary
            categories {
              name
            }
          }
        }
      }
    `,
    variables: {
      urlKey: context.params.id,
    },
  });

  return {
    props: {
      categories: data.products.items,
    },
  };
}
