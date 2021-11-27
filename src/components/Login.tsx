import { Form, Input, Button, Result } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import api from "../utils/api";
import showError from "../utils/showError";
function Login() {
    const history = useHistory();
    const location = useLocation<{ newSignUp?: boolean }>();
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            const response = await api.post("/users/login", values);
            console.log(response);
            history.push("/");
        } catch (error) {
            console.log(error);
            showError((error as any).response.data.errorMessage);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        showError(errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
