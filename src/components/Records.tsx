import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import form from "antd/lib/form";
import React, { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getCategories } from "../store/actions/categoryActions";
import {
    addRecord,
    deleteRecord,
    getRecords,
    updateRecord,
} from "../store/actions/recordAction";
import { Mode } from "../types/general";
import { Record, RecordForm } from "../types/record";

const emptyForm: RecordForm = {
    title: "",
    amount: 0,
    category_id: 0,
};

function Records() {
    const { data, loading, error } = useSelector(
        (state: AppState) => state.records
    );

    // Get categorıes from store
    const { data: categories } = useSelector(
        (state: AppState) => state.categories
    );
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("create");
    const [form, setForm] = useState<RecordForm>(emptyForm);
    const [id, setId] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
        setIsModalVisible(true);
        setMode(mode);
    };

    const handleOk = () => {
        if (mode === "create") {
            dispatch(addRecord(form));
        } else if (mode === "update" && typeof id === "number") {
            dispatch(updateRecord(id, form));
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
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount: Record["amount"], record: Record) => {
                // show the amount value with 2 decimals
                return <span>{amount.toFixed(2)} </span>;
            },
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category: Record["category"], record: Record) => {
                return (
                    <Tag color={category.color}>
                        {category.name.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Last Updated",
            dataIndex: "updatedAt",
            key: "updatedAt",
            // render the updatedAt value day, month,year and time without comma

            render: (updatedAt: Record["updatedAt"]) => {
                const date = new Date(updatedAt);
                return (
                    <span>
                        {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </span>
                );
            },
        },

        {
            title: "Action",
            key: "action",
            render: (text: string, record: Record) => {
                const { title, amount } = record;
                const category_id = record.category.id;
                return (
                    <Space size="middle">
                        <EditOutlined
                            style={{ color: "blue" }}
                            onClick={() => {
                                showModal("update");
                                setForm({ title, amount, category_id });
                                setId(record.id);
                                setMode("update");
                            }}
                        />
                        <DeleteOutlined
                            style={{ color: "red" }}
                            onClick={() => dispatch(deleteRecord(record.id))}
                        />
                    </Space>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(getRecords());
        !categories.length && dispatch(getCategories());
    }, [dispatch]);

    const isFormValid = (): boolean => {
        return form.title.length > 0 && form.amount > 0 && form.category_id > 0;
    };

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
                        Add Record
                    </Button>
                </div>
                <Modal
                    title={mode === "create" ? "Add Record" : "Update Record"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{
                        disabled: !isFormValid(),
                    }}
                >
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item
                            label="Record Title"
                            rules={[
                                {
                                    required: true,
                                    message: "Record title is required",
                                },
                            ]}
                        >
                            <Input
                                name="title"
                                value={form.title}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                    });
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            rules={[
                                {
                                    required: true,
                                    message: "Amount is required",
                                },
                            ]}
                        >
                            <Input
                                name="amount"
                                value={form.amount}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        amount: Number(e.target.value),
                                    });
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Category">
                            <Select
                                defaultValue={form.category_id}
                                value={form.category_id}
                                onChange={(value) => {
                                    setForm({
                                        ...form,
                                        category_id: value,
                                    });
                                }}
                            >
                                <Select.Option value={0} disabled>
                                    Select Category
                                </Select.Option>
                                {categories.map((category) => (
                                    <Select.Option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <Table loading={loading} columns={columns} dataSource={data} />;
        </React.Fragment>
    );
}

export default Records;
