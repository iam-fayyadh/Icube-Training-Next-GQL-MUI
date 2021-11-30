import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";
import { useQuery, ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
// import Card from "@material-ui/core/Card";
import CustomCard from "../../components/CustomCard";
import Link from "next/link";
import Navbar from "../../components/Navbar.jsx";

export default function Category({ categories }) {
  const router = useRouter();
  // const { data } = useQuery(QUERY, {
  //   variables: {
  //     categoryId: props.id,
  //   },
  // });
  // const product = data.category.products.items;
  // console.log(product);
  // console.log(categories.products.items[0]);
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to California</h1>

        <div className={styles.cardMap}>
          {categories.map((categories) => {
            return (
              <div key={categories.id}>
                <div className={styles.card}>
                  <Link href={`/Categories/Details/${categories.url_key}`}>
                    <h2>{categories.name}</h2>
                  </Link>
                  <img height={300} width={300} src={categories.image.url} />
                </div>
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

export async function getServerSideProps(context) {
  const client = new ApolloClient({
    uri: "https://b2cdemo.getswift.asia/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query getCategoryProduct($categoryId: Int!) {
        category(id: $categoryId) {
          id
          name
          products {
            items {
              __typename
              id
              name
              image {
                url
              }
              url_key
            }
          }
        }
      }
    `,
    variables: {
      categoryId: context.params.id,
    },
  });
  // console.log(data.categoryList);
  return {
    props: {
      categories: data.category.products.items,
    },
  };
}
