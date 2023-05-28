import React from "react";
import "./SingleCategory.scss";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../SingleProduct/SingleProduct";
import Error from "../Errorr/Error";
import Loader from "../Loader/Loader";
import { STATUS } from "../../utils/status";
import { formatPrice } from "../../utils/helper";
import { setModalData, setIsModalVisible } from "../../store/modalSlice";

const SingleCategory = ({ products, status }) => {
  const dispatch = useDispatch();

  //moc tu reducer
  const { isModalVisible } = useSelector((state) => state.modalReducer);

  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };

  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;
  return (
    <>
      <section className="cat-single py-5 bg-ghost-white">
        {isModalVisible && <SingleProduct />}

        <div className="container">
          <div className="cat-single-content">
            <div className="section-title">
              <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                {products[0].category.name}
              </h3>
            </div>

            <div className="product-items grid">
              {products.map((product) => (
                <div
                  className="product-item bg-white"
                  key={product.id}
                  onClick={() => viewModalHandler(product)}
                >
                  <div className="product-item-img">
                    <img
                      src={product.images[0]}
                      alt="img"
                      className="img-product"
                    />
                    <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">
                      {product.category.name}
                    </div>
                  </div>
                  <div className="product-item-body">
                    <h6 className="product-item-title text-pine-green fw-4 fs-15">
                      {product.title}
                    </h6>
                    <div className="product-item-price text-regal-blue fw-7 fs-18">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleCategory;
