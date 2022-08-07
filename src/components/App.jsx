import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import fetchImages from 'services/fetchImages';
import styled from 'styled-components';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  START: 'start',
  LOADING: 'loading',
  SUCCSESS: 'succsess',
  FAIL: 'fail',
};
const INITIAL_STATE = {
  showBtn: false,
  queryList: [],
  page: 1,
};

class App extends Component {
  state = {
    query: '',
    // page: 1,
    // queryList: [],
    status: Status.START,
    loaderActive: false,
    // showBtn: false,
    largeImage: null,
    tags: null,
    ...INITIAL_STATE,
  };

  handleFormSubmit = query => {
    if (query.trim() === '') {
      toast.warn('Nothing to search');
      this.setState({
        // query: '',
        ...INITIAL_STATE,
        status: Status.START,
      });
      return;
    }
    this.setState({
      query,
      // status: Status.LOADING,
      ...INITIAL_STATE,
    });
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    console.log(prevQuery, nextQuery);
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      try {
        this.setState({
          loaderActive: true,
        });
        const searchResult = await fetchImages(nextQuery, nextPage);
        console.log(searchResult);
        if (searchResult.total === 0) {
          toast(`Sorry, there are no images.`);
          this.setState({
            status: Status.FAIL,
            showBtn: false,
            queryList: [],
          });
        }
        if (nextPage === 1) {
          this.setState({
            queryList: [...searchResult.hits],
          });
        } else {
          this.setState({
            queryList: [...prevState.queryList, ...searchResult.hits],
          });
        }
        if (searchResult.hits.length > 0 && searchResult.hits.length < 12) {
          toast.info(`Seams thats all...`);
          this.setState({
            showBtn: false,
            // queryList: [...prevState.queryList, ...searchResult.hits],
            status: Status.SUCCSESS,
          });
        } else if (searchResult.hits.length === 0) {
          console.log('ff');
        } else {
          this.setState({
            showBtn: true,
            // queryList: [...prevState.queryList, ...searchResult.hits],
            status: Status.SUCCSESS,
          });
        }

        // console.log(searchResult.hits);
      } catch (error) {
        this.setState({ status: Status.FAIL });
      } finally {
        this.setState({ loaderActive: false });
      }
    }
  }
  openModal = (largeImageURL, tags) => {
    this.setState({ largeImage: largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ largeImage: null, tags: null });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    // console.log(prevState.page);
  };

  render() {
    const { queryList, status, showBtn, query, largeImage } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'start' && (
          <StyledNotification>Type something...</StyledNotification>
        )}
        {status === 'fail' && (
          <StyledNotification>There is nothing...</StyledNotification>
        )}
        {status === 'succsess' && (
          <ImageGallery queryList={queryList} openModal={this.openModal} />
        )}
        {status === 'loading' && (
          <StyledNotification>Search {query}</StyledNotification>
        )}
        {this.state.loaderActive && <Loader />}
        {showBtn && <Button loadMore={this.loadMore}>Load more</Button>}
        {largeImage?.length > 0 && (
          <Modal
            onClose={this.closeModal}
            large={this.state.largeImage}
            tags={this.state.tags}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </StyledApp>
    );
  }
}

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
const StyledNotification = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
`;

export default App;

// ---------------------------------старая версия
// class App extends Component {
//   state = {
//     query: '',
//   };

//   handleFormSubmit = query => {
//     this.setState({ query });
//   };

//   render() {
//     const { query } = this.state;
//     return (
//       <StyledApp>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery query={query} />
//         <ToastContainer position="top-center" theme="colored" />
//       </StyledApp>
//     );
//   }
// }

// const StyledApp = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   grid-gap: 16px;
//   padding-bottom: 24px;
// `;

// export default App;
