import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, calculateTotalDiscount }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p><CiShoppingCart /> No items</p>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0);

  return (
    <Container>
      <h1>Quotation</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Discount</th> {/* New Discount Column */}
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            let amount = v.qty * v.ppu - v.discount; // Subtract discount from amount
            return (
              <tr key={i}>
                <td className={style.textCenter}><BsFillTrashFill onClick={() => deleteByIndex(i)} /></td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textCenter}>{v.discount}</td> {/* Display Discount */}
                <td className={style.textRight}>{amount}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}></td> {/* Empty columns to align Total */}
            <td className={style.textRight}>Total</td>
            <td className={style.textRight}>{total}</td> {/* Total Amount */}
          </tr>
          <tr>
            <td colSpan={3}></td> {/* Empty columns to align Total Discount */}
            <td className={style.textRight}>Total Discount:</td>
            <td className={style.textRight}>{calculateTotalDiscount()}</td> {/* Total Discount Amount */}
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;