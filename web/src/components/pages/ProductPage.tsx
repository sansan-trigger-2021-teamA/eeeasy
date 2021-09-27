import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BuyButton from "../atoms/Button"

const createData = (
  name: string,
  weight: number,
  price: number,
  buy:any
) => {
  return { name, weight, price,buy };
};
const props = {
    text: "購入",
    func:function(){
        alert("購入")
    }
}

const rows = [
  createData("GPSデータ", 100, 300,<BuyButton {...props}/>),
  createData("生体情報",  3, 350,<BuyButton {...props}/>),
  createData("健康診断等データ+整体情報",20, 500,<BuyButton {...props}/>),
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProductPage: React.FC = () => {
  const classes = useStyles();

  return (
    <GenericTemplate title="商品ページ">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell align="right">数量(/万レコード)</TableCell>
              <TableCell align="right">価格(万円/月)</TableCell>
              <TableCell align="right">購入する</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.buy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GenericTemplate>
  );
};

export default ProductPage;