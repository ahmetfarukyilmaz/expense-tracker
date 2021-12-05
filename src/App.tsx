import { Route } from "react-router-dom";
import { Layout, Menu } from "antd";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";

const { Header, Content, Footer } = Layout;

function App() {
    return (
        <Layout>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                >
                    <Menu.Item key="1">
                        <a href="/login">Login</a>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <a href="/register">Sign Up</a>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <a href="/categories">Categories</a>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <a href="/records">Records</a>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content
                className="site-layout"
                style={{ padding: "50px", marginTop: 64 }}
            >
                <Route path="/register" component={SignUp} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/categories" component={Categories} />
                <PrivateRoute path="/records" component={Records} />
            </Content>
            <Footer style={{ textAlign: "center" }}>
                AFY - Expense Tracker App
            </Footer>
        </Layout>
    );
}

export default App;
