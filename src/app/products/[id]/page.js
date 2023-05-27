import React from 'react'
async function fetchProduct(id) {
  const resp = await fetch(`https://api.escuelajs.co/api/v1/products/${id}?limit=20`)
  return resp.json()
}

export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id)
  return {
    title: product.title,
    description: product.description,
    thumbnail: product.images[0],
    metadataBase: new URL('https://istad.co'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
        'de-DE': '/de-DE'
      }
    },
    openGraph: {
      images: product.images[1],
      title: product.title,
      description: product.descriptionj
    }
  }
}

export default async function ProductDetail({ params }) {
  const { id } = params
  const product = await fetchProduct(id)
  return (
    <main className="w-full justify-center item-center flex boder-1">
      <section class="productDetail">
        <img src={product.images} alt="" />
          <div className="detail">
            <h1 className='text-5xl mb-10 capitalize text-green-500 font-semibold '>{product.title}</h1>
            <p className='text-2xl mb-10 text-black'>{product.description}</p>
            <p className='text-2xl text-black'>Category : {product.category.name}</p>
            <p className='text-3xl mt-10 text-black'>Price: <span className='text-green-400'>${product.price}</span></p>
          </div>
      </section>
    </main>
  )
}
