import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        'authorization': `bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
      },
    });
    result = await result.json();
    if (result) {
      await getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          'authorization': `bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      await getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        onChange={searchHandle}
        type="text"
        placeholder="Search Product"
      ></input>
      <ul>
        <li>Sr No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? products.map((elem, index) => (
        <ul>
          <li>{index + 1}</li>
          <li>{elem.name}</li>
          <li>$ {elem.price}</li>
          <li>{elem.category}</li>
          <li>{elem.company}</li>
          <li>
            <button onClick={() => deleteProduct(elem._id)}>Delete</button>
            <Link to={`/update/${elem._id}`}>Update</Link>
          </li>
        </ul>
      ))
      : <h1>No Result Found</h1>
    }
    </div>
  );
};

export default ProductList;
