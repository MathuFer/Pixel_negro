import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { ProductosContext } from "../context/ProductosProvider";
import { AuthContext } from "../context/AuthProvider";

import "./styeComponents/Shoppingcart.css";

const ShoppingCart = () => {
  const { cart, eliminarDelPedido, registrarCompra, setCart } = useContext(ProductosContext);

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

  const { user } = useContext(AuthContext); 

  return (
    <div className="Carrito">
      <Container>
        <h2>Carrito de compras</h2>
        {groupedCart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="table-responsive">
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
                      <img
                        src={item.img}
                        alt={item.desc}
                        className="table-img"
                      />
                    </td>
                    <td>{item.desc || "Sin descripción"}</td>
                    <td>
                      {item.price.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </td>                    
                    <td>{item.quantity}</td>
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
                    <h3>
                      <strong>Total:</strong> {totalPrice.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
                    </h3>
                  </td>
                </tr>
              </tfoot>
            </Table>
            {user ? (
            <Button
              variant="success"
              onClick={async () => {
                await registrarCompra(); 
                setCart([]); 
                alert("Compra finalizada exitosamente.");
              }}
              className="mt-3"
            >
              Finalizar Compra
            </Button>
            ) : (
              <div>
                  <h6>Para finalizar su compra debe iniciar sesión</h6>
                <Link to="/InicioSesion">
                  <h6>Iniciar sesión</h6>
                </Link>
              </div>
            )
            }
          </div>
        )}
      </Container>
    </div>
  );
};

export default ShoppingCart;

