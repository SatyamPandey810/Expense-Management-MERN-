import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from 'axios';
import Spiner from '../components/Spiner';
import moment from 'moment';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const Home = () => {
    const [showModal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransation, setAllTransation] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [selectedDate, setSelectedDate] = useState([])
    const [type, setType] = useState('all')
    const [viewData, setViewData] = useState('table')
    const [editable, setEdittable] = useState(null)

    // table data
    const colums = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Type",
            dataIndex: "type"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Refrence",
            dataIndex: "refrence"
        },
        {
            title: "Refrence",
            dataIndex: "refrence"
        },
        {
            title: "Action",
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={() => {
                        setEdittable(record);
                        setModal(true);
                    }} />
                    <DeleteOutlined className='mx-2' onClick={() => { handleDelete(record) }} />
                </div>
            )
        },
    ]

    // get all transection
    useEffect(() => {
        const getAllTransaction = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                setLoading(true)
                const res = await axios.post('/api/v1/transection/get-transection', { userid: user._id, frequency, selectedDate, type })
                setLoading(false)
                setAllTransation(res.data)
                console.log(res.data);
            } catch (error) {
                console.log(error);
                message.error('Some technical issue');
            }
        }
        getAllTransaction()
    }, [frequency, selectedDate, type])

    // Delete handler
    const handleDelete = async (record) => {
        try {
            setLoading(true)
            await axios.post('/api/v1/transection/delete-transection', { transectionId: record._id })
            setLoading(false)
            message.success('Transection deleted')
        } catch (error) {
            setLoading(false)
            console.log(error);
            message.error('Unable to delete')
        }

    }
    // Form handling
    const handleSubmit = async (value) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            if (editable) {
                await axios.post('/api/v1/transection/edit-transection', {
                    payload: {
                        ...value,
                        userid: user._id
                    },
                    transectionId: editable._id
                })
                setLoading(false)
                message.success('Transection updated successfully')
            } else {
                await axios.post('/api/v1/transection/add-transection', { ...value, userid: user._id })
                setLoading(false)
                message.success('Transection added successfully')
            }
            setModal(false)
            setEdittable(null)
        } catch (error) {
            setLoading(false)
            message.error('Faild to add transection')
        }
    }


    return (
        <Layout>
            {
                loading && <Spiner />
            }
            <div className='filters'>
                <div>
                    <h5>Select Frequency</h5>
                    <Select value={frequency} onChange={(values) => setFrequency(values)}>
                        <Select.Option value="7">LAST 1 Week</Select.Option>
                        <Select.Option value="30">LAST 1 Month</Select.Option>
                        <Select.Option value="365">LAST 1 Year</Select.Option>
                        <Select.Option vlaue="custom">custom</Select.Option>
                    </Select>
                    {frequency === 'custom' && (
                        <RangePicker
                            value={selectedDate}
                            onChange={(values) => setSelectedDate(values)}
                        />
                    )}
                </div>
                <div>
                    <h5>Select Type</h5>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value="all">All Transaction</Select.Option>
                        <Select.Option value="income">INCOME</Select.Option>
                        <Select.Option value="expense">EXPENSE</Select.Option>
                    </Select>
                    {frequency === 'custom' && (
                        <RangePicker
                            value={selectedDate}
                            onChange={(values) => setSelectedDate(values)}
                        />
                    )}
                </div>
                <div className='switch-icon'>
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
                </div>
                <div>
                    <button className='btn btn-primary' onClick={() => setModal(true)}>Add new</button>
                </div>
            </div>
            <div className='content' >
                {
                    viewData === 'table' ? <Table columns={colums} dataSource={allTransation} /> : <Analytics allTransation={allTransation} />

                }

            </div>
            <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'}
                open={showModal}
                onCancel={() => setModal(false)}
                footer={false}
            >
                <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
                    <Form.Item label="Amount" name='amount'>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label='type' name='type'>
                        <Select>
                            <Select.Option value='income'>Inconme</Select.Option>
                            <Select.Option value='expense'>Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Category' name='category'>
                        <Select>
                            <Select.Option value='salary'>Salary</Select.Option>
                            <Select.Option value='tip'>Tip</Select.Option>
                            <Select.Option value='project'>Project</Select.Option>
                            <Select.Option value='food'>Food</Select.Option>
                            <Select.Option value='movie'>Movie</Select.Option>
                            <Select.Option value='bills'>Bills</Select.Option>
                            <Select.Option value='medical'>Medical</Select.Option>
                            <Select.Option value='education'>Education</Select.Option>
                            <Select.Option value='tax'>Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Refrence" name="refrence">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className='btn btn-warning'>SAVE</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    );
}

export default Home;
