import React, { useState } from "react";
import "./SingleProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalVisible } from "../../store/modalSlice";
import { formatPrice } from "../../utils/helper";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { data: product } = useSelector((state) => state.modalReducer);
  const [qty, setQty] = useState(1);

  //increaseQuantity
  const increaseQuantity = () => {
    setQty((prevQty) => {
      let newQty = prevQty + 1;
      return newQty;
    });
  };

  //decreaseQuantity
  const decreaseQuantity = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if (newQty < 1) newQty = 1;
      return newQty;
    });
  };

  //addToCartHandler
  const addToCartHandler = (product) => {
    let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };

    dispatch(addToCart(tempProduct));
    dispatch(setIsModalVisible(false));
    navigate("/cart");
  };

  const dispatch = useDispatch();
  return (
    <div className="overlay-bg">
      <div className="product-details-modal bg-white">
        <button
          className="modal-close-btn flex flex-center fs-14"
          onClick={() => dispatch(setIsModalVisible(false))}
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="details-content grid">
          {/* detail-content-left */}
          <div className="details-left">
            <img src={product.images[0]} alt="img" className="img-details" />
          </div>
          {/* detail-content-right */}
          <div className="details-right">
            <div className="details-info">
              <h3 className="title text-regal-blue fs-22 fw-5">
                {product.title}
              </h3>
              <p className="description text-pine-green">
                {product.description}
              </p>
              <div className="price fw-7 fs-24">
                Price: {formatPrice(product.price)}
              </div>

              <div className="qty flex">
                <span className="text-light-blue qty-text">Quantity: </span>
                <div className="qty-change flex">
                  <button
                    type="button"
                    className="qty-dec fs-14"
                    onClick={() => decreaseQuantity()}
                  >
                    <i className="fas fa-minus text-light-blue"></i>
                  </button>
                  <span className="qty-value flex flex-center">{qty}</span>
                  <button
                    type="button"
                    className="qty-inc fs-14 text-light-blue"
                    onClick={() => increaseQuantity()}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn-primary add-to-cart-btn"
                onClick={() => addToCartHandler(product)}
              >
                <span className="btn-icon">
                  <i className="fas fa-cart-shopping"></i>
                </span>
                <span className="btn-text">Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
