import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button onClick={() => navigate("/products")}>
        View All Products
      </button>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminHome;