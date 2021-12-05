import { Route } from "react-router-dom";
import { Layout, Menu } from "antd";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";

const { Content, Footer } = Layout;

function App() {
    return (
        <Layout>
            <AppHeader />
            <Content
                className="site-layout"
                style={{ padding: "50px", marginTop: 64 }}
            >
                <Route path="/register" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
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
