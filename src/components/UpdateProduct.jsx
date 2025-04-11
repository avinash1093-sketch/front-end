import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate("/");
  const params = useParams();


  useEffect(() => {
    const getProduct = async () => {
      let result = await fetch(`https://backend-node-black-kappa.vercel.app/product/${params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(
            localStorage.getItem("authToken")
          )}`,
        },
      });
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    };
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = async () => {
    await fetch(`https://backend-node-black-kappa.vercel.app/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("authToken")
        )}`,
      },
    });
    // result = await result.json();
    navigate("/");
  };

  return (
    <div className="update-product">
      <h1>Update Product</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name"
        className="inputBox"
      ></input>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Product Price"
        className="inputBox"
      ></input>

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter Product Category"
        className="inputBox"
      ></input>

      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Product Company"
        className="inputBox"
      ></input>

      <button onClick={updateProduct} className="appbutton" type="button">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
