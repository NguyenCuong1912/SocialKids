import React, { useState } from 'react'
import { Select, Button, Input } from 'antd';
export default function Home() {


    const [arrTag, setArrTag] = useState([])
    // console.log(arrTag)
    const handleButton = (id, name) => {
        const tag = {
            id, name, typeText: false
        }
        const arrTagNew = [...arrTag, tag]
        setArrTag(arrTagNew)
    }
    const handleDel = (idTag) => {
        const arrCurrent = [...arrTag];
        // console.log(arrCurrent)
        const index = arrTag.findIndex((element => element.id == idTag))
        if (index > -1) {
            arrCurrent.splice(index, 1)
        }
        setArrTag(arrCurrent)
        // console.log("index", arrTag)
    }
    const handleChange = (value, idTag) => {
        const arrCurrent = [...arrTag];
        const index = arrTag.findIndex((element => element.id == idTag))
        if (index > -1) {
            if (value) {
                arrCurrent[index].typeText = false

            } else {
                arrCurrent[index].typeText = true

            }
        }

        setArrTag(arrCurrent)

        // console.log(value, id)
    };
    const renderTag = () => {
        return arrTag?.map((tag, index) => {
            return <div className='flex justify-center my-2' key={ index }>
                <div className='mr-5'>
                    <Select
                        style={ {
                            width: 200,
                        } }
                        placeholder="Phép toán"
                        options={ [
                            {
                                value: '1',
                                label: '+',
                            },

                        ] }
                    />
                </div>
                <div className='mr-5'>
                    <Select
                        style={ {
                            width: 200,
                        } }
                        placeholder="Kiểu tính phụ phí"
                        onChange={ (value) => { handleChange(value, tag.id) } }
                        options={ [
                            {
                                value: false,
                                label: 'Tỷ lệ',
                            },
                            {
                                value: true,
                                label: 'Thành Tiền',
                            },
                        ] }
                    />
                </div>
                <div className='mr-5'>
                    { tag.typeText == true ?
                        <Select
                            style={ {
                                width: 200,
                            } }
                            placeholder="Kiểu tính phụ phí"
                            onChange={ handleChange }
                            options={ [
                                {
                                    value: '1',
                                    label: 'Tỷ lệ',
                                },
                                {
                                    value: '2',
                                    label: 'Thành Tiền',
                                },
                            ] }
                        />
                        : <Input placeholder="Kiểu phụ phí" />
                    }

                </div>
                <div>
                    <Button className='bg-red-600 text-white'
                        onClick={ () => {
                            handleDel(tag.id)
                        } }
                    >Xóa</Button>
                </div>
            </div>
        })
    }

    return (
        <div className='m-20'>
            <div className='flex justify-center'>
                <div className='mr-5'>
                    <Input placeholder="Tên phụ phí" />
                </div>
                <div className='mr-5'>
                    <Select
                        style={ {
                            width: 200,
                        } }
                        placeholder="Loại phụ phí"
                        allowClear
                        options={ [
                            {

                                value: '1',
                                label: 'Lặp lại',
                            },
                            {
                                value: '2',
                                label: 'Không lặp lại',
                            },
                        ] }
                    />
                </div>
                <div>
                    <Button className='bg-green-600 text-white'
                        onClick={ () => {
                            const id = Math.random();
                            handleButton(id, `tag${id}`)
                        } }
                    >Thêm mới</Button>
                </div>
            </div>
            {/*  */ }
            <div className='mt-6 border p-2'>

                { renderTag() }
            </div>
        </div>
    )
}
