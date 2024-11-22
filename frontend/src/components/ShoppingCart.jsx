import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { ProductosContext } from "../context/ProductosProvider";
import "./styeComponents/Carrito.css";

const ShoppingCart = () => {
  const { cart, eliminarDelPedido } = useContext(ProductosContext);

  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; 
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const totalPrice = groupedCart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="Carrito">
      <Container>
        <h2>Carrito de compras</h2>
        {groupedCart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <Table className="table table-dark table-striped text-center">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {groupedCart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt={item.desc} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                  </td>
                  <td>{item.desc}</td>
                  <td>{item.price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</td>
                  <td>
                    <span>{item.quantity}</span> {}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarDelPedido(item.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} align="right">
                  <h3><strong>Total:</strong> {totalPrice.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</h3>
                </td>
              </tr>
            </tfoot>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default ShoppingCart;
