import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";
import { useQuery, ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
// import Card from "@material-ui/core/Card";
import CustomCard from "../../components/CustomCard";
import useStyles from "../../styles";
import Link from "next/link";
import Navbar from "../../components/Navbar.jsx";
import { GET_CATEGORY_PRODUCT } from "../../services/";

export default function Category({ categories }) {
  const router = useRouter();
  const classes = useStyles();
  const { data, loading, error } = GET_CATEGORY_PRODUCT(router.query.id);
  if (loading) return <></>;
  if (error) return <>error</>;

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to California</h1>

        <div className={classes.cardMap}>
          {data.category.products.items.map((categories) => {
            return (
              <div key={categories.id}>
                <Link href={`/Categories/Details/${categories.url_key}`}>
                  <div className={styles.card}>
                    <h2>{categories.name}</h2>
                    <img height={250} width={250} src={categories.image.url} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

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

// export async function getServerSideProps(context) {
//   const { data } = await client.query({
//     query: GET_CATEGORY_PRODUCT(context.params.id),
//   });

//   return {
//     props: {
//       categories: data.category.products.items,
//     },
//   };
// }
