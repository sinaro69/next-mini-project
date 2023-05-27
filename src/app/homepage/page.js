
import Product from '.././products/page';
import Categories from '.././categories/categories';
import Users from '../users/page';
export default function Homepage() {
    return (
        <div>

            <section className="page-2 px-20 flex-col items-center justify-between w-100">
                <Product />
            </section>

            <section className="page-3 flex-col items-center justify-between w-100">
                
                <Categories />
            </section>
            <section className="page-3 px-20 flex-col items-center justify-between w-100">
                
                <Users />
            </section>
        </div>
    )
}
