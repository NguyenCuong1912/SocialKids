import React, { useState } from 'react'
import { Select, Button, Input } from 'antd';
import Data from '../Data.json'
export default function Home() {
    //typeText  true -> render Selection false -> text
    const dataConvert = [...Data]
    const [arrTag, setArrTag] = useState(dataConvert)
    console.log("arr", arrTag)
    // add Tag
    const handleButton = (id, name) => {
        const tag = {
            id,
            name,
            phepToan: "+",
            kieuPhuPhi: "tyLe",
            typeText: false
        }
        Data.push(tag)
        const newData = [...Data]
        setArrTag(newData)
        console.log("Data", Data)
    }
    // Delete Tag
    const handleDel = (idTag) => {
        const index = arrTag.findIndex((ele) => ele.id == idTag);
        if (index !== -1) {
            const newArr = [...arrTag]
            newArr.splice(index, 1)
            setArrTag(newArr)
            Data.splice(index, 1)
        }
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
            return <div className='flex justify-center px-8 my-2' key={ index }>
                <div className='mr-5'>
                    <Select
                        style={ {
                            width: 200,
                        } }
                        value={ tag.phepToan }
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
                        value={ tag.kieuPhuPhi }
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
                <div className='mr-5 ' style={ { width: '200px' } }>
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
        <div className='my-20 '>
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
            <div className='my-6 mx-40 border px-10'>

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
