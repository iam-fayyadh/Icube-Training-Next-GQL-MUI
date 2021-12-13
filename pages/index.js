import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useStyles from "../styles";
import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Button from "@mui/material/Button";
import Link from "next/link";
import Navbar from "../components/Navbar.jsx";
import Wave from "../assets/blob-scene-haikei.svg";
import { client } from "./_app.js";
import { GET_CATEGORY_LIST } from "../services/schema";
import { makeStyles } from "@mui/styles";

export default function Home(items) {
  const initialState = items;
  const [categories, setCategories] = useState(initialState.categories);

  return (
    <div className={styles.layout}>
      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to California</h1>
        <h2 className={styles.title}>Choose what do you want to buy</h2>

        <div className={styles.cardMapHome}>
          {categories.map((categories) => {
            return (
              <Link href={`/Categories/${categories.id}`}>
                <div key={categories.id}>
                  <div className={styles.card}>
                    <h2 className={styles.cardText}>{categories.name}</h2>
                  </div>
                </div>
              </Link>
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

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GET_CATEGORY_LIST,
  });
  return {
    props: {
      categories: data.categoryList,
    },
  };
}
