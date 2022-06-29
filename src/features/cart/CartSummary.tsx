import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Row, Col, Tag, Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Checkout from "../../components/Checkout";
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
          {cart.length === 0 ? (
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
              <Title
                level={3}
                style={{
                  paddingLeft: "14px",
                  paddingTop: "14px",
                  marginBottom: 0,
                }}>
                My Cart
              </Title>
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
                            $95.00 each
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
