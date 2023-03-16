import React, { useState } from 'react'
import { Select, Button, Input } from 'antd';
import Data from '../Data.json'
export default function Home() {
    //typeText  true -> render Selection false -> text
    const [arrTag, setArrTag] = useState(Data)
    // add Tag
    const handleButton = (id, name) => {
        const tag = {
            id,
            name,
            phepToan: "+",
            kieuPhuPhi: "tyLe",
            typeText: false
        }
        const arrTagNew = [...arrTag, tag]
        setArrTag(arrTagNew)
        Data.push(tag)
    }
    // Delete Tag
    const handleDel = (idTag) => {
        const arrCurrent = [...arrTag];
        const index = arrTag.findIndex((element => element.id == idTag))
        if (index > -1) {
            arrCurrent.splice(index, 1)
        }
        setArrTag(arrCurrent)
        Data.splice(index, 1)
    }
    // Change tag Select
    const handleChange = (value, idTag) => {
        const arrCurrent = [...arrTag];
        const index = arrTag.findIndex((element => element.id == idTag))
        if (index > -1) {
            if (value === "+" || value === "-") {
                arrCurrent[index].phepToan = value
                Data[index].phepToan = value
            }
            if (value === 'tyLe') {
                arrCurrent[index].typeText = false
                Data[index].kieuPhuPhi = "tyLe"
                Data[index].typeText = false
            } else if (value === 'thanhTien') {
                arrCurrent[index].typeText = true
                Data[index].kieuPhuPhi = "thanhTien"
                Data[index].typeText = true
            }
        }
        setArrTag(arrCurrent)
    };

    const renderTag = () => {
        return arrTag?.map((tag, index) => {
            return <div className='flex justify-center my-2' key={ index }>
                <div className='mr-5'>
                    <Select
                        style={ {
                            width: 200,
                        } }
                        defaultValue={ tag.phepToan }
                        onChange={ (value) => { handleChange(value, tag.id) } }
                        placeholder="Phép toán"
                        options={ [
                            {
                                value: '+',
                                label: '+',
                            },
                            {
                                value: '-',
                                label: '-',
                            },

                        ] }
                    />
                </div>

                <div className='mr-5'>
                    <Select
                        style={ {
                            width: 200,
                        } }
                        defaultValue={ tag.kieuPhuPhi }
                        placeholder="Kiểu tính phụ phí"
                        onChange={ (value) => { handleChange(value, tag.id) } }
                        options={ [
                            {
                                value: "tyLe",
                                label: 'Tỷ lệ',
                            },
                            {
                                value: "thanhTien",
                                label: 'Thành Tiền',
                            },
                        ] }
                    />
                </div>
                <div className='mr-5'>
                    { tag.typeText == true ?
                        <Input placeholder="" />
                        :
                        <Select
                            style={ {
                                width: 200,
                            } }
                            placeholder=""
                            onChange={ handleChange }
                            options={ [
                                {
                                    value: '1',
                                    label: 'option1',
                                },
                                {
                                    value: '2',
                                    label: 'option2',
                                },
                                {
                                    value: '3',
                                    label: 'option3',
                                },
                            ] }
                        />

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
            <div className='flex justify-center my-6'>
                <Button className='bg-green-600 text-white'
                    onClick={ () => {
                        console.log(Data)
                    } }
                >Lưu danh sách</Button>
            </div>
        </div>
    )
}
