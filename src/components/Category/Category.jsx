import "./Category.scss";
import React from "react";
import { STATUS } from "../../utils/status";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Errorr/Error";

const Category = ({ categories, status }) => {
  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;

  return (
    <>
      <section className="categories py-5 bg-ghost-white" id="categories">
        <div className="container">
          <div className="categories-content">
            <div className="section-title">
              <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                Category
              </h3>
            </div>

            <div className="category-items grid">
              {categories.slice(0, 5).map((category) => (
                <Link to={`category/${category.id}`} key={category.id}>
                  <div className="category-item">
                    <div className="category-item-img flex">
                      <img
                        src={category.image}
                        alt="category-img"
                        className="category-img"
                      />
                    </div>
                    <div className="category-item-name text-center">
                      <h6 className="fs-20">{category.name}</h6>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
