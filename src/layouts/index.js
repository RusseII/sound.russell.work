import {Layout} from 'antd'
import styles from './index.css';
const { Footer, Content, Header } = Layout;

function BasicLayout(props) {
  return (
      <Content className={styles.normal}>
      {props.children}
    </Content>
  );
}

export default BasicLayout;
