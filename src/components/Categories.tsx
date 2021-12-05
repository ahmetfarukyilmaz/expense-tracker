import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
    addCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { CirclePicker } from "react-color";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Mode } from "../types/general";

const emptyForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "red",
};

function Categories() {
    const { data, loading, error } = useSelector(
        (state: AppState) => state.categories
    );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("create");
    const [form, setForm] = useState<CategoryForm>(emptyForm);
    const [id, setId] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
        setIsModalVisible(true);
        setMode(mode);
    };

    const handleOk = () => {
        if (mode === "create") {
            dispatch(addCategory(form));
        } else if (mode === "update" && typeof id === "number") {
            dispatch(updateCategory(id, form));
        }
        setIsModalVisible(false);
        setMode("create");
        setForm(emptyForm);
        setId(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setMode("create");
        setForm(emptyForm);
        setId(null);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (text: string, category: Category) => {
                return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
            },
        },

        {
            title: "Action",
            key: "action",
            render: (text: string, category: Category) => (
                <Space size="middle">
                    <EditOutlined
                        style={{ color: "blue" }}
                        onClick={() => {
                            showModal("update");
                            setForm(category);
                            setId(category.id);
                        }}
                    />
                    <DeleteOutlined
                        style={{ color: "red" }}
                        onClick={() => {
                            dispatch(deleteCategory(category.id));
                        }}
                    />
                </Space>
            ),
        },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <React.Fragment>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                    }}
                >
                    <Button type="primary" onClick={() => showModal("create")}>
                        Add Category
                    </Button>
                </div>
                <Modal
                    title={
                        mode === "create" ? "Add Category" : "Update Category"
                    }
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{
                        disabled: !form.name,
                    }}
                >
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item
                            label="Category Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Category name is required",
                                },
                            ]}
                        >
                            <Input
                                name="name"
                                value={form.name}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Category Type">
                            <Select
                                defaultValue="expense"
                                value={form.type}
                                onChange={(type) => {
                                    setForm({
                                        ...form,
                                        type: type,
                                    });
                                }}
                            >
                                <Select.Option value="income">
                                    Income
                                </Select.Option>
                                <Select.Option value="expense">
                                    Expense
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Category Color">
                            <CirclePicker
                                color={form.color}
                                onChangeComplete={(color) => {
                                    setForm({
                                        ...form,
                                        color: color.hex,
                                    });
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                rowKey="id"
            />
        </React.Fragment>
    );
}

export default Categories;
