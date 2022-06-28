import PageLayout from "../../components/PageLayout";
import { useRouter } from "next/router";
import useApi from "../../api/useApi";
import { Button, Divider, Layout, Modal, Row, Space, Typography } from "antd";
import PreviewTabs from "../../components/PreviewTabs";
import ChoreoGuidePreviewer from "../../components/ChoreoGuidePreviewer";
import DropCard from "../../components/DropCard";
import { useState } from "react";
import LeadForm from "../../components/LeadForm";

const { Content } = Layout;
const { Title } = Typography;

export default function ShowPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const { packageId } = router.query;
  const { data: packageData } = useApi<Package>(
    packageId && {
      path: `packages/${packageId}`,
      params: {
        include: "show,scenes",
      },
    }
  );
  let pkg: Package;
  if (packageData && packageData.data) pkg = packageData.data;
  const { data: choreoGuideData } = useApi<ChoreoGuide[]>(
    pkg && {
      path: "choreo-guides",
      params: {
        "filter[package_id]": pkg.id,
      },
    }
  );
  const { data: dropsData } = useApi<Drop[]>(
    pkg && {
      path: "drops",
      params: {
        "filter[show_ids]": pkg.show.id,
      },
    }
  );

  let guide: ChoreoGuide;
  if (choreoGuideData && choreoGuideData.data) guide = choreoGuideData.data[0];

  let drops: Drop[];
  if (dropsData && dropsData.data) drops = dropsData.data;

  return (
    <PageLayout>
      <Modal
        visible={showModal}
        closable={false}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={() => setShowModal(false)}>
            Submit
          </Button>,
        ]}>
        <LeadForm />
      </Modal>
      <Content
        style={{
          maxWidth: "1024px",
          margin: "auto",
          paddingTop: "24px",
          paddingBottom: "48px",
          height: "100%",
          overflow: "auto",
        }}>
        {pkg && (
          <>
            <Title>{pkg.show.title}</Title>
            <Divider />
            <Title level={2}>Scenic Projections</Title>
            <PreviewTabs
              scenes={pkg.scenes}
              curtainWarmer={pkg.curtainWarmerPreview}
            />
            <Divider />
            <Title level={2}>Choreography Guide</Title>
            {guide && <ChoreoGuidePreviewer guide={guide} level={3} />}
            <Divider />
            <Title level={2}>Digital Backdrops</Title>
            {drops && (
              <Row justify='center'>
                <Space size='large' wrap align='start'>
                  {drops.map((drop) => (
                    <DropCard key={drop.id} drop={drop} />
                  ))}
                </Space>
              </Row>
            )}
          </>
        )}
      </Content>
    </PageLayout>
  );
}
