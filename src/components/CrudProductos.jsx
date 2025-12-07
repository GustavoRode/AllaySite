import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Row, Col } from "react-bootstrap";

const API_URL = "https://692e49a591e00bafccd3623c.mockapi.io/products";

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

 
 ///obtengo los productos.
  const getProductos = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  // cierro el modal
  const handleClose = () => {
    setShow(false);
    setForm({ title: "", description: "", price: "", stock: "", category: "", image: "" });
    setEditId(null);
  };

  //Abrir modal 
  const handleShow = (producto) => {
    setShow(true);
    if (producto) {
      setForm({
        ...producto,
        price: Number(producto.price),
        stock: Number(producto.stock),
      });
      setEditId(producto.id);
    }
  };

  // 🔹 Crear o editar producto
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar el producto");
        return res.json();
      })
      .then(() => {
        handleClose();
        getProductos();
      })
      .catch((error) => console.error("Error:", error));
  };

  // Eliminar 
  const eliminarProducto = (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar el producto");
        getProductos();
      })
      .catch((error) => console.error("Error:", error));
  };

  //productos al iniciar
  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>CRUD de Productos</h2>
      <Button className="mb-3" onClick={() => handleShow()}>
        Agregar Producto
      </Button>

      <Table striped bordered hover className="table-sm small">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.title}</td>
              <td>{prod.description}</td>
              <td>${Number(prod.price).toFixed(2)}</td>
              <td>{prod.stock}</td>
              <td>{prod.category}</td>
              <td>
                {prod.image?.startsWith("http") ? (
                  <img
                    src={prod.image}
                    alt={prod.title}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span>{prod.image}</span>
                )}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleShow(prod)}
                >
                  Editar
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de agregar / editar */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Editar" : "Agregar"} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formTitle" className="mb-2 align-items-center">
              <Form.Label column sm={3} className="mb-0">Título</Form.Label>
              <Col sm={9}>
                <Form.Control
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription" className="mb-2 align-items-center">
              <Form.Label column sm={3} className="mb-0">Descripción</Form.Label>
              <Col sm={9}>
                <Form.Control
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPrice" className="mb-2 align-items-center">
              <Form.Label column sm={3} className="mb-0">Precio</Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formStock" className="mb-2 align-items-center">
              <Form.Label column sm={3} className="mb-0">Stock</Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCategory" className="mb-2 align-items-center">
              <Form.Label column sm={3} className="mb-0">Categoría</Form.Label>
              <Col sm={9}>
                <Form.Control
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formImage" className="mb-2 align-items-center">
              <Form.Label column sm={3} className="mb-0">Imagen (URL)</Form.Label>
              <Col sm={9}>
                <Form.Control
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                />
              </Col>
            </Form.Group>

            <div className="text-end">
              <Button type="submit" className="mt-2">Guardar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudProductos;
