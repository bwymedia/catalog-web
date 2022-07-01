import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Row, Col, Tag, Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { CgClapperBoard } from "react-icons/cg";

import Checkout from "../../components/Checkout";
import { useAppSelector } from "../../hooks/hooks";
import useComponentVisible from "../../hooks/useComponentVisible";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "./cartSlice";
import styles from "./CartSummary.module.css";

const { Title } = Typography;

const CartSummary = ({ cart }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const quantity = cart.map((item) => item.quantity);

  let arr = [];
  quantity.forEach((item) => {
    if (item >= 5) {
      item = 5;
    }
    for (let i = 0; i < item; i++) {
      arr.push(<CgClapperBoard key={i} />);
    }
    return arr;
  });
  return (
    <div className={styles.active}>
      <Row style={{ lineHeight: "25px" }}>
        <Col
          span={24}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}>
          <Title
            level={3}
            style={{
              paddingLeft: "14px",
              paddingTop: "14px",
              marginBottom: 0,
            }}>
            Shopping Cart
          </Title>
          <Title
            level={5}
            style={{
              paddingLeft: "14px",
              marginTop: 0,
              marginBottom: 0,
            }}>
            {totalQuantity >= 5
              ? "You unlocked the Unlimited Drop Package!"
              : `Add ${5 - totalQuantity} more to get Unlimited drops`}
          </Title>
          {/* <div
            style={{
              display: "flex",
              paddingLeft: "14px",
              marginTop: ".25rem",
              marginBottom: 0,
              alignItems: "center",
              fontSize: "2.5rem",
            }}>
            {arr}
          </div> */}

          {totalQuantity === 0 ? (
            <div
              style={{
                textAlign: "center",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <div style={{ width: "300px" }}>Your Cart is Empty</div>
            </div>
          ) : (
            <>
              <ul
                className={styles.cartItems}
                style={{ listStyleType: "none", marginBottom: 0 }}>
                {cart.map((product) => {
                  return (
                    <li key={product.id}>
                      <Row
                        style={{
                          display: "flex",
                          height: "auto",
                          position: "relative",
                          marginTop: "3px",
                        }}>
                        <Col xs={10} style={{ height: "100%" }}>
                          <div className={styles.videoContainer}>
                            <video
                              playsInline
                              src={product.previewVideo}
                              className={styles.previewVideo}
                            />
                          </div>
                        </Col>
                        <Col
                          xs={14}
                          style={{
                            height: "auto",
                            paddingLeft: "8px",
                            lineHeight: "15px",
                          }}>
                          <p style={{ fontSize: "80%", marginBottom: "0" }}>
                            {product.name}&nbsp;
                            <Tag color='cyan'>#{product.id}</Tag>
                          </p>
                          <p style={{ fontSize: "80%", marginBottom: "0" }}>
                            {totalQuantity >= 5 ? "Unlimited" : "$95.00 each"}
                          </p>
                          <Row
                            style={{
                              width: "100%",
                              position: "absolute",
                              bottom: "10px",
                            }}>
                            <Col
                              span={24}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                height: "100%",
                                marginTop: "auto",
                                marginBottom: "auto",
                                alignItems: "center",
                              }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "50%",
                                }}>
                                <Button
                                  type='ghost'
                                  size='small'
                                  shape='circle'
                                  onClick={() =>
                                    dispatch(decrementQuantity(product.id))
                                  }>
                                  -
                                </Button>
                                <span style={{ fontSize: "80%" }}>
                                  {product.quantity}
                                </span>
                                <Button
                                  type='ghost'
                                  size='small'
                                  shape='circle'
                                  onClick={() =>
                                    dispatch(incrementQuantity(product.id))
                                  }>
                                  +
                                </Button>
                              </div>
                              <a
                                onClick={() =>
                                  dispatch(removeFromCart(product.id))
                                }
                                style={{ fontSize: "14px", outline: 0 }}>
                                <DeleteOutlined />
                              </a>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </Col>
        <Col
          span={24}
          style={{
            paddingLeft: "14px",
            paddingRight: "14px",
            position: "absolute",
            right: "0",
            bottom: "48px",
          }}>
          {totalQuantity > 0 && (
            <p>
              Quantity: {totalQuantity}
              <br />
              Total: ${totalQuantity >= 5 ? "495" : `${totalQuantity * 95}`}
            </p>
          )}
        </Col>
        <Col
          span={24}
          style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            position: "absolute",
            bottom: "12px",
            width: "100%",
            height: "auto",
          }}>
          <Checkout />
        </Col>
      </Row>
    </div>
  );
};
export default CartSummary;
