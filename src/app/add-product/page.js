'use client'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik"
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { BASE_URL } from "../constant/constant";

import '.././globals.css'

async function fetchCategories(){
    const response = await fetch('https://api.escuelajs.co/api/v1/categories?limit=10');
    const data = await response.json();
    return data;
}

export default function Insert() {

    const [isLoading, setIsLoading] = useState(true);
    const [imageURL, setImageURL] = useState("");

    const FILE_SIZE = 1024 * 1024 * 10; // 10MB
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
    const [productCategory, setcattegory] = useState([]);
    useEffect(() => {
        fetchCategories().then(data => setcattegory(data))
    })

    const validateSchema = Yup.object().shape({
        title: Yup.string().required("Required title"),
        price: Yup.number().required("You to set your price"),
        description: Yup.string().required("Description must not blank"),
        categoryId: Yup.number().positive().required(10, "Choose your category"),
        file: Yup.mixed().test("fileSize", "File too large", (value) => {
            console.log("value", value);
            if (!value) {
                return true
            }
            return value.size <= FILE_SIZE;
        }).test("fileFormat", "Unsupported Format", (value) => {
            if (!value) {
                return true
            }
            return SUPPORTED_FORMATS.includes(value.type);
        }).required("Required")
    })
    const uploadImage = async (values) => {
        try {
            const response = await axios.post(
                `${BASE_URL}files/upload`,
                values.file
            );
            console.log(response);
            setIsLoading(false);
            return response.data.location;
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }

    const insertUser = async (data) => {
        let { title, price, description, categoryId, images } = data
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const userData = JSON.stringify({
            title,
            price,
            description,
            categoryId,
            images
        })

        let requestData = {
            method: "POST",
            headers: myHeaders,
            body: userData,
        }

        fetch(`${BASE_URL}products`, requestData)
            .then(res => res.json())
            .then(resp => {
                console.log(resp)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log("Cannot post the product", error.message)
            })
    }
    return (
        <Formik
            initialValues={{
                title: "",
                price: 0,
                description: "",
                categoryId: 0,
                images: [],
            }}
            validationSchema={validateSchema}
            onSubmit={async (values, { setSubmitting }) => {
                const formData = new FormData();

                formData.append("file", values.file);
                const images = await uploadImage({ file: formData });
                console.log("avatar", images);
                console.log(values.file);
                values.images = [images];

                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    insertUser(values);
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {
                ({ isSubmitting }) => (
                    <section className="bg-gray-50 dark:bg-gray-900 mb-20">
                        <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                <img className="w-8 h-8 mr-2" src="https://play-lh.googleusercontent.com/PaSl-oIRK6C8AoKsAcNtBUNmN5jb2n2AaPHRhlxor_DJAxUG3UAETE7CDmTkn9Duwq0=s256-rw" alt="logo" />
                                Shopify
                            </a>
                            <div className=" bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Add product
                                    </h1>
                                    <Form
                                        className="add-responsive space-y-6 md:space-y-6 flex justify-between items-center gap-5"
                                    >
                                        <div>
                                            <div>
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product title</label>
                                                <Field type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Product title" />
                                                <ErrorMessage
                                                    name="title"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product price</label>
                                                <Field type="number" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="$ ___" required="" />
                                                <ErrorMessage
                                                    name="price"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>

                                            </div>
                                            <div>
                                                <label htmlFor="decription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write your description</label>
                                                <Field as="textarea" type="text" name="description" id="password" placeholder="Description" className="resize-none bg-gray-50 h-40 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required="" />
                                                <ErrorMessage
                                                    name="description"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                            <div>

                                                <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose your gategory</label>
                                                <Field
                                                    as="select" name="categoryId" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required="" >
                                                    <option value="">select your product category</option>
                                                    {
                                                        productCategory.map(item => (
                                                            <option value={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <ErrorMessage
                                                    name="categoryId"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file" className="p-5 flex flex-col items-center justify-center w-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    </div>
                                                    <Field
                                                        id="dropzone-file"
                                                        name="file"
                                                        type="file"
                                                        className="hidden"
                                                        component={DropFileZone}
                                                    />

                                                </label>
                                            </div>
                                            <div>
                                                <ErrorMessage
                                                    name="file"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>

                                                <button
                                                    disabled={isSubmitting}
                                                    type="submit" className="mt-10 text-white w-full bg-green-500 hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
                                                    <p className="text-center">Post your product into our website here</p>
                                                </button>
                                            </div>
                                        </div>
                                    </Form>

                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </Formik>
    )
}

function DropFileZone({ field, form }) {
    const [previewImage, setPreviewImage] = useState(null);
    const handleChange = (event) => {
        const file = event.currentTarget.files[0];
        form.setFieldValue(field.name, file);
        setPreviewImage(URL.createObjectURL(file));
    }
    return (
        <>
            <input
                id="dropzone-file"
                type="file"
                name="file"
                onChange={handleChange}
                className="hidden"
            />
            {previewImage && (
                <img
                    src={previewImage}
                    alt="preview"
                    className="mt-2 h-full w-full" />
            )}
        </>
    )
}