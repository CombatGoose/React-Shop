import { createSlice } from '@reduxjs/toolkit';

import { searchValues } from '../../utils/search';

const initialState = ({
    list: [
        { id: 1, name: 'Gaming PC', category: 'Computers', price: 1500 },
        { id: 2, name: '4K Monitor', category: 'Monitors', price: 400 },
        { id: 3, name: 'Mechanical Keyboard', category: 'Peripherals', price: 80 },
        { id: 4, name: 'Laptop', category: 'Computers', price: 1200 },
        { id: 5, name: 'Gaming Headset', category: 'Audio', price: 100 },
        { id: 6, name: 'Smartphone', category: 'Electronics', price: 700 },
        { id: 7, name: 'External Hard Drive', category: 'Storage', price: 80 },
        { id: 8, name: 'Graphics Card', category: 'Components', price: 500 },
        { id: 9, name: 'Wireless Router', category: 'Networking', price: 70 },
        { id: 10, name: 'Desk Chair', category: 'Furniture', price: 150 },
        { id: 11, name: 'LED TV', category: 'TVs', price: 800 },
        { id: 12, name: 'Bluetooth Earbuds', category: 'Audio', price: 50 },
        { id: 13, name: 'Printer', category: 'Printers', price: 200 },
        { id: 14, name: 'Tablet', category: 'Electronics', price: 300 },
        { id: 15, name: 'Gaming Mouse', category: 'Peripherals', price: 60 },
        { id: 16, name: 'Solid State Drive (SSD)', category: 'Storage', price: 100 },
        { id: 17, name: 'Virtual Reality (VR) Headset', category: 'Accessories', price: 300 },
        { id: 18, name: 'Smartwatch', category: 'Wearables', price: 150 },
        { id: 19, name: 'Webcam', category: 'Peripherals', price: 40 },
        { id: 20, name: 'Bluetooth Speaker', category: 'Audio', price: 80 },
    ],
    isFilteredByType: false,
    isFilteredByPrice: false,
    isFiltered: false,
    isSearched: false,
    category: 'All',
    basketList: []
});

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      getProducts: (state) => state.list,
      getFilteredProductsByPrice: (state, action) => {
        const { minPrice, maxPrice } = action.payload;
  
        if (!action.payload || isNaN(minPrice) || isNaN(maxPrice)) {
          return state.list;
        }
        return state.list.filter(item => item.price >= minPrice && item.price <= maxPrice);
      },
      changeActiveButton: (state, action) => {
        state.category = action.payload.category;
      },
      getFilteredProductsByType: (state, action) => {
        const { category } = action.payload;
  
        if (!action.payload || !category) {
          return state.list;
        }
  
        return state.list.filter(item => item.category === category);
      },
      search: (state, action) => {
        const foundProduct = state.list.find(item => item.category === action.payload.category);
        if (foundProduct) return state.list.filter(item => item.category === action.payload.category);
        
        return state.list.filter(item => searchValues(item.name, action.payload.search));
        /*
        const { search } = action.payload;
  
        if (!search) return state.list;
  
        let points = 0;

        let searchArray = [];
        let nameArray = [];

        let returnArray = [];

        state.list.forEach(item => {
          if (search.length > item.name.length) {
            return false;
          } else {
            for (let i = 0; i < item.name.length - 1; i++) {
              if (search.toLowerCase().indexOf(item.name[i]) !== -1) points++;
            } 
            if ((item.name.toLowerCase().length / 100) * search.toLowerCase().length * 100 > 25) {
              returnArray.push(item);
              return state.list.filter(el => el.name === item.name);
            } else {
              return false;
            }
          }
        })

        const strToArr = (search, searchArray) => {
          if (search.includes(' ')) {
            const wordsArray = search.split(' ');
            searchArray = wordsArray.map(word => word.split(' ')).flat();
          } else {
            searchArray = search.split(' ');
          }
        }

        strToArr(search, searchArray); // Call the function to have array of user's search

        for (let i = 0; i < state.list.length; i++) { // Use cycle 'for' to have array with names of all products
          if (search === state.list[i].name || search === state.list[i].category) returnArray.push(state.list[i]);
          
          strToArr(state.list[i].name, nameArray);
          // Now we have array with symbols of user's search and array with symbols of product name so we can compare them to offer necessary products to user after search

          for (let j = 0; j < nameArray.length; j++) {
            for (let o = 0; o < searchArray.length; o++) {
              if (nameArray[j].toLowerCase() === searchArray[o].toLowerCase()) {
                points++;
                nameArray.splice(j, 1);
                j = -1;
              } else {
                j = -1;
              }
            }
          }

          if (points >= 0.3 * nameArray.length) returnArray.push(state.list[i]);
        }
        return returnArray; */
      },
      addToBasket: (state, action) => { 
            const currentProduct = state.list.find(item => item.id === action.payload); 
            state.basketList = [
                ...state.basketList,
                {
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    category: currentProduct.category
                }
            ]
    },
      changeIsFiltered: state => {
        state.isFiltered = true;
      },
      changeIsFilteredByType: state => {
        state.isFilteredByType = true;
      },
      changeIsFilteredByPrice: state => {
        state.isFilteredByPrice = true;
      },
      changeIsSearched: state => {
        state.isSearched = true;
      }
    },
  });
  
export const { addToBasket, getProducts, getFilteredProductsByPrice, getFilteredProductsByType, changeActiveButton, search, changeIsFiltered, changeIsFilteredByType, changeIsFilteredByPrice, changeIsSearched } = productSlice.actions;
  
export default productSlice.reducer;