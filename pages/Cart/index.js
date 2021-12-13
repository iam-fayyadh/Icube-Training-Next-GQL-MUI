import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar.jsx";
import ReactHtmlParser from "react-html-parser";
import Navba from "../../components/Navbar.jsx";
import styles from "../../styles/Home.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "../../styles";

export default function Cart() {
  const router = useRouter();
  const classes = useStyles();
  const [Cart, setCart] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const getCart = () => {
    let cart = sessionStorage.getItem("Cart");
    if (Cart === null) {
      setCart([]);
    } else {
      let categories = JSON.parse(cart) || [];
      setCart(categories);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getCart();
  }, [isDelete]);

  const handleDeleteCart = (item) => {
    let data = Cart.filter((cart, index) => {
      return index !== item;
    });
    // console.log(data);
    let savedItem = JSON.stringify(data);
    sessionStorage.setItem("Cart", savedItem);
    setIsDelete(!isDelete);
  };

  return (
    <div>
      <Navba />
      <div className={styles.container}>
        <div className={styles.cardMap}>
          {Cart.map((Cart, index) => {
            let parse = ReactHtmlParser(Cart.description.html);
            return (
              <div key={index}>
                <div className={styles.cardCart}>
                  <h2>{Cart.name}</h2>
                  <img height={250} width={250} src={Cart.image.url} />
                  <h2>Description</h2>
                  {/* <p>{categories.description.html}</p> */}
                  {parse}
                  <h3>Price</h3>
                  <p>
                    Rp.
                    {Cart.price_range.maximum_price.final_price.value}
                    ,-
                  </p>
                  <DeleteIcon
                    className={classes.btnDelete}
                    onClick={() => handleDeleteCart(index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
