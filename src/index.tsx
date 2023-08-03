import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Podcast from "./components/podcast/Podcast";
import Layout from "./components/layout/Layout";
import PodcastList from "./components/podcast/PodcastList";
import Search from "./components/layout/Search";
import Header from "./components/header/Header";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <PodcastList/>,
    },
    {
        path: "/podcast/:podcastId",
        element: <Podcast/>,
    }]);

root.render(
  <React.StrictMode>
      <Search>
          <Header/>
          <Layout>
              <RouterProvider router={router} />
          </Layout>
      </Search>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
