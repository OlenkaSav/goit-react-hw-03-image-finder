import React, { Component } from 'react';
import fetchImages from 'services/fetchImages';
import Loader from 'components/Loader';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';

const Status = {
  START: 'start',
  LOADING: 'loading',
  SUCCSESS: 'succsess',
  FAIL: 'fail',
};
// const INITIAL_STATE = {
//   //   showButton: true,
//   queryList: [],
//   //   status: Status.START,
//   //   showModal: false,
//   largeImage: null,
//   tags: null,
//   page: 1,
// };

class ImageGallery extends Component {
  state = {
    query: '',
    page: 1,
    queryList: [],
    status: Status.START,
    showModal: false,
    showBtn: false,
    largeImage: null,
    tags: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    // const prevPage = prevState.page;
    const nextPage = this.state.page;
    // console.log(prevProps.onOpenModal());

    try {
      if (prevQuery !== nextQuery) {
        this.setState({ status: Status.LOADING });
        const searchResult = await fetchImages(nextQuery, nextPage);
        console.log(searchResult);
        if (searchResult.hits.length === 0) {
          this.setState({ status: Status.FAIL });
        } else {
          this.setState({
            queryList: [...prevState.queryList, ...searchResult.hits],
            status: Status.SUCCSESS,
          });
        }
      }
      // console.log(searchResult.hits);
      // .fetchPokemon(nextName)
      // .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
      // .catch(error => this.setState({ error, status: Status.REJECTED }));
    } catch (error) {
      this.setState({ status: Status.FAIL });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    console.log('open modal');
  };

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ largeImage: largeImageURL, tags });
  };

  closeModal = () => {
    this.toggleModal();
    this.setState({ largeImage: null, tags: null });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // console.log(prevState.page);
  };

  render() {
    const { status, queryList, showModal, showBtn } = this.state;
    const { query } = this.props;
    // const openModal = this.props.onOpenModal;

    if (status === 'start') {
      return <div>Введите</div>;
    }

    if (status === 'loading') {
      return <Loader query={query} />;
    }

    if (status === 'fail') {
      return <div>Нету</div>;
    }

    if (status === 'succsess') {
      return (
        <>
          <StyledImageGallery>
            {queryList.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={this.openModal}
              />
            ))}
          </StyledImageGallery>
          {showBtn && <Button loadMore={this.loadMore}>Load more</Button>}
          {showModal && (
            <Modal
              onClose={this.closeModal}
              large={this.state.largeImage}
              tags={this.state.tags}
            />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  queryList: PropTypes.arrayOf(PropTypes.shape({})),
};

// --------Styles-------
const StyledImageGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
export default ImageGallery;

// import React, { Component } from 'react';
// import fetchImages from 'services/fetchImages';
// import Loader from 'components/Loader';
// import ImageGalleryItem from './ImageGalleryItem';
// import Modal from 'components/Modal';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// const Status = {
//   START: 'start',
//   LOADING: 'loading',
//   SUCCSESS: 'succsess',
//   FAIL: 'fail',
// };
// const INITIAL_STATE = {
//   //   showButton: true,
//   queryList: [],
//   //   status: Status.START,
//   //   showModal: false,
//   largeImage: null,
//   tags: null,
//   page: 1,
// };

// class ImageGallery extends Component {
//   state = {
//     query: '',
//     page: 1,
//     queryList: [],
//     status: Status.START,
//     showModal: false,
//     largeImage: null,
//     tags: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.query;
//     const nextQuery = this.props.query;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;
//     // console.log(prevProps.onOpenModal());

//       try {
//           if (prevQuery !== nextQuery || prevPage !== nextPage) {
//               this.setState({ status: Status.LOADING });
//               const searchResult = await fetchImages(nextQuery, nextPage);
//               if (searchResult.hits.length === 0) {
//                   this.setState({ status: Status.FAIL });
//               } else {
//                   //   prevProps.onOpenModal();
//                   this.setState({
//                       queryList: searchResult.hits,
//                       status: Status.SUCCSESS,
//                   });
//               }
//           }
//           // console.log(searchResult.hits);
//           // .fetchPokemon(nextName)
//           // .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
//           // .catch(error => this.setState({ error, status: Status.REJECTED }));
//       } catch (error) {
//           this.setState({ status: Status.FAIL });
//       }
//     }
//   }
// loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }))
// };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//     console.log('open modal');
//   };

//   openModal = (largeImageURL, tags) => {
//     this.toggleModal();
//     this.setState({ largeImage: largeImageURL, tags });
//   };

//   closeModal = () => {
//     this.toggleModal();
//     this.setState({ largeImage: null, tags: null });
//   };

// render() {
//     const { status, queryList, showModal } = this.state;
//     const { query } = this.props;
//     // const openModal = this.props.onOpenModal;

//     if (status === 'start') {
//       return <div>Введите</div>;
//     }

//     if (status === 'loading') {
//       return <Loader query={query} />;
//     }

//     if (status === 'fail') {
//       return <div>Нету</div>;
//     }

//     if (status === 'succsess') {
//       return (
//         <>
//           <StyledImageGallery>
//             {queryList.map(({ id, webformatURL, largeImageURL, tags }) => (
//               <ImageGalleryItem
//                 key={id}
//                 webformatURL={webformatURL}
//                 largeImageURL={largeImageURL}
//                 tags={tags}
//                 onClick={this.openModal}
//               />
//             ))}
//           </StyledImageGallery>
//           {showModal && (
//             <Modal
//               onClose={this.closeModal}
//               large={this.state.largeImage}
//               tags={this.state.tags}
//             />
//           )}
//         </>
//       );
//     }
//   }

// ImageGallery.propTypes = {
//   queryList: PropTypes.arrayOf(PropTypes.shape({})),
// };

// // --------Styles-------
// const StyledImageGallery = styled.ul`
//   display: grid;
//   max-width: calc(100vw - 48px);
//   grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//   grid-gap: 16px;
//   margin-top: 0;
//   margin-bottom: 0;
//   padding: 0;
//   list-style: none;
//   margin-left: auto;
//   margin-right: auto;
// `;
// export default ImageGallery;
