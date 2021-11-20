import { Layout } from "antd";

const { Footer } = Layout;

export const FooterComponent = () => (
  <Footer style={{ 
    textAlign: 'center',
    position: 'absolute',
    bottom:0,
    width: '100%',
    height: '60px',
    background: '#6cf'
    }}
  >
    Chat app ©2021 Created by alex0popa
  </Footer>
);