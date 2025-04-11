import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    console.log(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/addProduct", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "content-type": "application/json",
        'authorization': `bearer ${JSON.parse(localStorage.getItem('authToken'))}`,
      },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      alert("Product is added");
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
        className="inputBox"
      ></input>
      {error && !name && <span className="invalid-input">Enter Valid Name</span>}
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
        className="inputBox"
      ></input>
      {error && !price && <span className="invalid-input">Enter Valid Price</span>}

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
        className="inputBox"
      ></input>
      {error && !category && <span className="invalid-input">Enter Valid Category</span>}

      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Product Company"
        className="inputBox"
      ></input>
      {error && !company && <span className="invalid-input">Enter Valid Company</span>}

      <button onClick={addProduct}  className="appbutton" type="button">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
