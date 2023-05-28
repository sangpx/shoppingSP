import React, { useEffect } from "react";
import "./HomePage.scss";
import Slider from "../../components/Slider/Slider";
import Category from "../../components/Category/Category";
import ProductList from "../../components/ProductList/ProductList";
import SingleCategory from "../../components/SingleCategory/SingleCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProductsByCategory,
  dataSelect,
  dataStatus,
  catProductAll,
  catProductAllStatus,
} from "../../store/categorySlice";
import { fetchProducts } from "../../store/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const categories = useSelector(dataSelect);
  const categoryStatus = useSelector(dataStatus);
  const productsByCategory = useSelector(catProductAll);
  const catProductsAllStatus = useSelector(catProductAllStatus);

  const { data: products, status: productStatus } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(1, "all"));
    dispatch(fetchProductsByCategory(2, "all"));
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <div className="home-page">
        {/* Slider */}
        <Slider />

        {/* Category */}
        <Category categories={categories} status={categoryStatus} />

        {/* ProductList */}
        <ProductList products={products} status={productStatus} />

        {/* Category one product */}
        <section>
          {productsByCategory[0] && (
            <SingleCategory
              products={productsByCategory[0]}
              status={catProductsAllStatus}
            />
          )}
        </section>

        {/* Category two products */}
        <section>
          {productsByCategory[2] && (
            <SingleCategory
              products={productsByCategory[2]}
              status={catProductsAllStatus}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default HomePage;
