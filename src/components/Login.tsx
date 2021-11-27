import { Form, Input, Button, Result } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AppState } from "../store";
import { login } from "../store/actions/userActions";
import { LoginForm } from "../types/user";
import showError from "../utils/showError";
import showSuccess from "../utils/showSuccess";

function Login() {
    const location = useLocation<{ newSignUp?: boolean }>();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(
        (state: AppState) => state.user
    );
    const history = useHistory();

    const onFinish = (values: LoginForm) => {
        dispatch(login(values));
    };

    useEffect(() => {
        error && showError(error);
    }, [error]);

    useEffect(() => {
        data.username && showSuccess("You have successfully logged in!");
    }, [data.username]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.push("/");
        }
    }, [data]);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ margin: "auto", width: "50%" }}
        >
            <h2 style={{ textAlign: "center" }}>Login</h2>
            {location.state && location.state.newSignUp && (
                <Result
                    status="success"
                    title="You have successfully signed up!"
                    subTitle="Use your username and password to log in."
                />
            )}

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;
