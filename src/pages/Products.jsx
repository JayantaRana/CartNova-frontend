import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "https://cartnova-6tap.onrender.com/admin/products",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  return (
    <div>
      <h2>All Products (Admin)</h2>

      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid black", margin: 10 }}>
          <h3>{p.name}</h3>
          <p>{p.price}</p>
          <p>{p.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;