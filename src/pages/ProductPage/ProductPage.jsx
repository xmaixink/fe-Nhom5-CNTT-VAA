import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getAllProductService } from "../../services/productService";
import "./ProductPage.css";

const ProductPage = () => {
  const [fetchProductData, setFetchProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProductService("ALL");
        setFetchProductData(response.products);
      } catch (error) {
        console.log("fetch Product error", error);
      }
    };

    fetchProduct();
  }, []);

  const filteredProducts = fetchProductData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-page">
      <Navbar setSearchQuery={setSearchQuery} />

      {filteredProducts && filteredProducts.length > 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "black",
            }}
          >
            Sản Phẩm Chính
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            {filteredProducts.map((item) => (
              <div
                key={item.id || item.name}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "186px",
                    height: "248px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    margin: "10px 0",
                  }}
                >
                  {item.name}
                </h3>
                <p style={{ color: "#555", fontSize: "14px" }}>
                  {item.description}
                </p>
                <p
                  style={{
                    color: "#d9534f",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Price: {item.price}
                </p>
                <button
                  style={{
                    backgroundColor: "#0275d8",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  <Link
                    to={{
                      pathname: `/product/${item._id}`,
                      state: { product: item },
                    }}
                    className="product-link"
                  >
                    View Details
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No products found.</p>
      )}
    </div>



  );
};

export default ProductPage;
