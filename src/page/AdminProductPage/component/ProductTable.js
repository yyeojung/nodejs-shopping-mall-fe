import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../../../utils/number";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.sku}</td>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <td>{currencyFormat(item.price)}</td>
                <td>
                  {item.stock.length > 0 &&
                    item.stock.map((stock) => (
                      <div key={stock.size}>
                        {stock.size}: {stock.quantity}개
                      </div>
                    ))}
                </td>
                <td>
                  <img src={item.image} width={100} alt="image" />
                </td>
                <td>{item.status}</td>
                <td style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item._id)}
                    className="mr-1"
                  >
                    -
                  </Button>
                  <Button size="sm" onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Data to show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
