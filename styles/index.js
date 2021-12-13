import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cardMap: {
    display: "flex",
    flexWrap: "wrap",
  },

  cardMapHome: {
    display: "grid",
    gridGap: "45px",
    padding: "40px",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 5fr))",
    gridAutoRows: "200px",
    width: "90%",
    margin: "0 auto",
    border: "2px solid white",
  },
  buttonCard: {
    textAlign: "right",
  },

  btnDelete: {
    display: "flex",
    width: 500,
    cursor: "pointer",
    justifyContent: "flex-end",
  },

  des: {
    display: "flex",
  },
  namePic: {
    width: "50%",
  },

  priBut: {
    paddingLeft: 15,
    width: "70%",
  },
});

export default useStyles;
