import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuthPersistence from './helpers/useAuthPersistence';
import ScrollToTop from './helpers/ScrollToTop';

import Header from './components/Header';
import SpinnerLoading from './components/SpinnerLoading'
import NotFound from './components/NotFound';

const HomePage = React.lazy(() => import('./pages/Home/HomePage'));
const ProductDetail = React.lazy(() => import('./pages/productDetail/ProductDetail'));
const Searchproduct = React.lazy(() => import('./pages/SearchProduct/Searchproduct'));
const Cart = React.lazy(() => import('./pages/addToCart/Cart'));
const LikeMeals = React.lazy(() => import('./pages/LikeMeals/LikeMeals'));
const HelpPage = React.lazy(() => import('./pages/helpPage/HelpPage'));
const ProductByCategory = React.lazy(() => import('./pages/categoryProduct/ProductByCategory'));

// user profile route
const Private = React.lazy(() => import('./components/router/Private'));
const UserProfile = React.lazy(() => import('./pages/userProfile/UserProfile'));
const UserOrder = React.lazy(() => import('./pages/userProfile/UserOrder'));
const UserLikePro = React.lazy(() => import('./pages/userProfile/UserLikePro'));

// Admin route
const Adminroute = React.lazy(() => import('./components/router/Adminroute'));
const AdminDash = React.lazy(() => import('./pages/Admin/AdminDash'));
const CreateCategory = React.lazy(() => import('./pages/Admin/CreateCategory'));
const CreateProduct = React.lazy(() => import('./pages/Admin/CreateProduct'));
const AllProducts = React.lazy(() => import('./pages/Admin/AllProducts'));
const UbdateProducts = React.lazy(() => import('./pages/Admin/UbdateProducts'));
const AllCastomer = React.lazy(() => import('./pages/Admin/AllCastomer'));
const AllOrder = React.lazy(() => import('./pages/Admin/AllOrder'));

const App = () => {
  useAuthPersistence();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <Suspense fallback={<SpinnerLoading />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/*' element={<NotFound />} />
            <Route path='/product-detail/:slug' element={<ProductDetail />} />
            <Route path='/search-product' element={<Searchproduct />} />
            <Route path='/add-to-cart' element={<Cart />} />
            <Route path='/liked-products' element={<LikeMeals />} />
            <Route path='/support' element={<HelpPage />} />
            <Route path='/product/by/category/:slug' element={<ProductByCategory />} />
            <Route path='/userprofile/*' element={<Private />}>
              <Route path='user' element={<UserProfile />} />
              <Route path='user-oders' element={<UserOrder />} />
              <Route path='user/like/product' element={<UserLikePro />} />
            </Route>
            <Route path='/admindashbord/*' element={<Adminroute />}>
              <Route path='dashbord' element={<AdminDash />} />
              <Route path='craete-category' element={<CreateCategory />} />
              <Route path='craete-product' element={<CreateProduct />} />
              <Route path='all-products' element={<AllProducts />} />
              <Route path='ubdate-products/:slug' element={<UbdateProducts />} />
              <Route path='all-castomrs' element={<AllCastomer />} />
              <Route path='all-orders' element={<AllOrder />} />
            </Route>
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
};

export default App;
