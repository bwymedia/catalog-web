import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { Row , Col, Tag, Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import useComponentVisible from '../hooks/useComponentVisible';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../../redux/cart.slice';
import styles from '../styles/CartSummary.module.css';

const { Title } = Typography;

const CartSummary = ({cart}) => {

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.active}>
      <Row style={{lineHeight: "25px"}}>
        <Col span={24} style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "100%"}}>
        {cart.length === 0 ? (
          <div style={{textAlign: "center", paddingTop: "12px", height: "300px", display: "flex",
          alignItems: "center", justifyContent: "center"}}>
            <div style={{ width: "300px"}}>Your Cart is Empty</div>
          </div>
        ) : (
          <ul 
            className={styles.cartItems} 
            style={{listStyleType: "none", marginBottom: 0}}
          >
            {cart.map((product) => {
              return (
                <li key={product.id}>
                  <Row style={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%"}}>
                    <Col span={24} style={{height: "100%"}}>
                      <p>{product.name}&nbsp;<Tag color="cyan">#{product.id}</Tag></p>

                    </Col>
                  </Row>
                  <Row span={24} style={{ marginBottom: "12px"}}>
                    <Col span={11} style={{display: "flex", justifyContent: "space-around", height: "100%", marginTop: "auto", marginBottom: "auto"}}>
                    <Button type="primary" shape="circle" onClick={() => dispatch(decrementQuantity(product.id))}>
                        -
                      </Button>
                      <span style={{ fontSize: "2rem"}}>{product.quantity}</span>
                      <Button type="primary" shape="circle" onClick={() => dispatch(incrementQuantity(product.id))}>
                        +
                      </Button>
                    </Col>
                    <Col span={11}>
                      <video src={product.previewVideo} alt={product.name} className={styles.previewVideo} />
                    </Col>
                    <Col span={2} style={{ height: "100%", marginTop: "auto", marginBottom: "auto", textAlign: "center" }}>
                      <a onClick={() => dispatch(removeFromCart(product.id))} style={{ fontSize: "16px" }}>
                      <CloseOutlined />
                      </a>
                    </Col>
                  </Row>
                </li>
              );
            }
            )}
          </ul>
        )}
        </Col>
        <Col span={24} style={{paddingLeft: "12px", paddingRight: "12px", position: "absolute", bottom: "12px", width: "100%", height: "auto"}}>
            <Button type="primary" className={cart.length === 0 ? `disabled` : ''} style={{width: "100%", textTransform: "uppercase"}}>Proceed To Checkout</Button>
          </Col>
      </Row>
    </div>
  );
}
export default CartSummary;