import "../styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ColorProvider from "../components/ColorProvider";
// Apollo Client Configuration

export const client = new ApolloClient({
  uri: "https://b2cdemo.getswift.asia/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ColorProvider>
        <Component {...pageProps} />
      </ColorProvider>
    </ApolloProvider>
  );
}

export default MyApp;
