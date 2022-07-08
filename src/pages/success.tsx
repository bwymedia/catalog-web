import { useRouter } from "next/router";
import useSWr from "swr";
import { Result, Row, Col, Typography, Button } from "antd";

import PageLayout from "../components/PageLayout";
const { Title } = Typography;

const Success = () => {
  const router = useRouter();

  const { data, error } = useSWr(
    router.query.session_id
      ? `/api/checkout_session/${router.query.session_id}`
      : null,
    (url) => fetch(url).then((res) => res.json())
  );

  // const { session } = data;
  // const { payment_intent } = session;
  // const { metadata } = payment_intent;
  // const { quantity } = metadata;
  // const { amount } = payment_intent;

  // const cost = amount / 100;
  // const itemsOrdered = quantity;
  return (
    <PageLayout>
      <Result
        status='success'
        title='Thank you for your order!'
        subTitle={`The order confirmation has been sent to your email address.`}
        extra={[
          <Row key='1' gutter={[16, 16]} style={{ width: "100%" }}>
            {/* <Col
              xs={{ span: 12, offset: 0 }}
              lg={{ span: 4, offset: 8 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}>
              {cost && <Title level={3}>{cost}</Title>}
              <Title level={5}>Total amount</Title>
            </Col>
            <Col
              xs={{ span: 12, offset: 0 }}
              lg={{ span: 4, offset: 8 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}>
              {itemsOrdered && <Title level={3}>x{itemsOrdered}</Title>}
              <Title level={5}>Items ordered</Title>
            </Col> */}
            <Col span={24}>
              <Button type='link' href='/'>
                Find More Drops
              </Button>
            </Col>
          </Row>,
        ]}
      />
      {/* <pre>{data ? JSON.stringify(data, null, 2) : "Loading"}</pre> */}
    </PageLayout>
  );
};

export default Success;
