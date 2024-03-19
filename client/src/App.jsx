import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { addToBasket, getProducts, getFilteredProductsByPrice, getFilteredProductsByType, changeActiveButton, search, changeIsFiltered, changeIsFilteredByType, changeIsFilteredByPrice, changeIsSearched } from './features/products/productSlice';

import './styles.scss';

const App = () => {
    const dispatch = useDispatch();

    const list = useSelector(state => state.products.list || state.products);
    console.log(list);
    
    const isFiltered = useSelector(state => state.products.isFiltered);
    const isFilteredByType = useSelector(state => state.products.isFilteredByType);
    const isFilteredByPrice = useSelector(state => state.products.isFilteredByPrice);
    const isSearched = useSelector(state => state.products.isSearched);
    const category = useSelector(state => state.products.category);

    const [form, setForm] = useState({
        minPrice: null,
        maxPrice: null,
        search: ''
    });

    const handleUpdateForm = (formType, formName) => { 
        setForm({
          ...form,
          [formType]: formName
        });
        if (form.minPrice && form.maxPrice) {
            dispatch(changeIsFiltered());
            dispatch(changeIsFilteredByPrice());
        } else if (form.search) {
            dispatch(changeIsFiltered());
            dispatch(changeIsSearched());
        }
      }

      const [productType, setProductType] = useState('');

      const setProductTypeHandler = (category) => {
        setProductType(category);
        dispatch(changeActiveButton({ category: category }));

        dispatch(changeIsFiltered());
        dispatch(changeIsFilteredByType());
      }

      const handleGetProducts = () => {
        if (!isFiltered) {
            console.log(isSearched);
            dispatch(getProducts());
        } else if (isFilteredByPrice) {
            dispatch(getFilteredProductsByPrice({minPrice: form.minPrice, maxPrice: form.maxPrice}));
        } else if (isFilteredByType) {
            dispatch(getFilteredProductsByType({category: productType}));
        } else if (isSearched) {
            dispatch(search({search: form.search}));
        }
      }

      const handleAddToBasket = (id) => {
        dispatch(addToBasket(id));
      }

      const ProductsCollection = list.map((product, index) => (
        <div className="product-card" key={index}>
            <h3>Name: {product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}$</p>
            <button onClick={e => handleAddToBasket(product.id)}>Add to cart</button>
        </div>
      ));

    return (
        <>
            <header className="header">
                <h1 className="header_logo">Logo</h1>
                <input type="text" className="header_input" placeholder="Enter product name" onChange={e => handleUpdateForm('search', e.target.value)}/>
                <button className='header_button' onClick={handleGetProducts}>Search</button>
            </header>
            <section className='main-cont'>
                <div className="main-cont_side-bar">
                    <ul className='main-cont_side-bar_ul'>
                        <h3>Filters by category:</h3>
                        <li className={category === 'Computers' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Computers')}>Computers</li>
                        <li className={category === 'Monitors' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Monitors')}>Monitors</li>
                        <li className={category === 'Peripherals' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Peripherals')}>Peripherals</li>
                        <li className={category === 'Audio' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Audio')}>Audio</li>
                        <li className={category === 'Electronics' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Electronics')}>Electronics</li>
                        <li className={category === 'Storage' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Storage')}>Storage</li>
                        <li className={category === 'Components' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Components')}>Components</li>
                        <li className={category === 'Networking' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Networking')}>Networking</li>
                        <li className={category === 'Furniture' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Furniture')}>Furniture</li>
                        <li className={category === 'Printers' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Printers')}>Printers</li>
                        <li className={category === 'TVs' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('TVs')}>TVs</li>
                        <li className={category === 'Accessories' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Accessories')}>Accessories</li>
                        <li className={category === 'Wearables' ? 'main-cont_side-bar_ul_li_active' : 'main-cont_side-bar_ul_li'} onClick={setProductTypeHandler('Wearables')}>Wearables</li>
                    </ul>
                    <div className="main-cont_side-bar_price-filter">
                        <p>Price Filter:</p>
                        <input type="text" placeholder='Min price' onChange={e => handleUpdateForm('minPrice', e.target.value)}/>
                        <input type="text" placeholder='Max price' onChange={e => handleUpdateForm('maxPrice', e.target.value)}/>
                    </div>
                </div>
                <main className="main-cont_main">
                { ProductsCollection }
                </main>
            </section>
        </>
    );
};

export default App;