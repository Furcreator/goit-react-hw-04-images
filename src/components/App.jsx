import React, { useState } from 'react';
import SearchBar from './Searchbar/Searchbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import PropTypes from 'prop-types';

const App = () => {
  const [imagesArray, setImagesArray] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [page, setPage] = useState(1);
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addImgLink = link => {
    setImageLink(link);
  };

  async function getFromApi(text, numPage) {
    const API_KEY = `34923936-72b1522875746ba4d44cc2019`;
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    });
    const URL = `${BASE_URL}?key=${API_KEY}&q=${text}&page=${numPage}&${searchParams}`;
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      if (response.data.totalHits < 1) {
        toast.error(`За запитом "${this.state.query}" результатів нема!`);
        setQuery('');
        setPage(1);
        setShowBtnLoadMore(false);
        return;
      } else if (response.data.hits.lenght !== 0) {
        setImagesArray(prev => [...prev, ...response.data.hits]);
      }
      let totalNumberOfImages = response.data.totalHits;
      let alredyDownloadImages = 12 * page;

      if (alredyDownloadImages < totalNumberOfImages) {
        if (page === 1) {
          console.log('1 запит');
          toast(
            `За запитом "${query}" знайдено картинок: ${totalNumberOfImages}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        } else {
          console.log('наступний запит');
          const moreImages = totalNumberOfImages - alredyDownloadImages;
          toast(
            `За запитом "${query}" лишилося ще картинок: ${moreImages} із ${totalNumberOfImages}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        }
        setShowBtnLoadMore(true);
      } else {
        toast(
          `Це всі результати за запитом "${query}". Більше результатів нема!`
        );
        setShowBtnLoadMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmitSearchBtn = text => {
    setQuery(text);
    setImagesArray([]);
    setPage(1);
    getFromApi(text, 1);
  };

  const onBtnClickMore = () => {
    getFromApi(query, page + 1);
    setPage(prev => prev + 1);
  };

  const togleModal = () => {
    setShowModal(!showModal);
    setShowModal(!showModal);
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <SearchBar onSubmit={onSubmitSearchBtn} />
      {isLoading && <Loader />}
      {showModal && <Modal imageLink={imageLink} togleModal={togleModal} />}
      {imagesArray.length > 0 && (
        <ImageGallery
          images={imagesArray}
          addImgLink={addImgLink}
          togleModal={togleModal}
        />
      )}
      {showBtnLoadMore && <Button onClick={onBtnClickMore} />}
    </>
  );
};

export default App;

App.propTypes = {
  imagesArray: PropTypes.array,
  query: PropTypes.string,
  showModal: PropTypes.bool,
  imageLink: PropTypes.string,
  page: PropTypes.number,
  showBtnLoadMore: PropTypes.bool,
  isLoading: PropTypes.bool,
};
