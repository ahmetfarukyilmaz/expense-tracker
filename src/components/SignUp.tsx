import { Form, Input, Space, message, Button } from "antd";
import api from "../utils/api";
import { useHistory } from "react-router-dom";

const showError = (errorMessage: string) => {
    message.error(errorMessage);
};

function SignUp() {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    const history = useHistory();

    const onFinish = async (values: any) => {
        try {
            const response = await api.post("/users/register", values);
            console.log(response);
            history.push("/login");
        } catch (error) {
            console.log(error);
            showError((error as any).response.data.errorMessage);
        }
    };
    return (
        // Center the form
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            style={{ margin: "auto", width: "50%" }}
        >
            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
            <Form.Item
                name={"username"}
                label="Username"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                        min: 6,
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name={"email"}
                label="Email"
                rules={[{ type: "email", required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="full_name" label="Full Name">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignUp;
