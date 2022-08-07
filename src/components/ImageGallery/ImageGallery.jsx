import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { toast } from 'react-toastify';

// const INITIAL_STATE = {
//   //   showButton: true,
//   queryList: [],
//   //   status: Status.START,
//   //   showModal: false,
//   largeImage: null,
//   tags: null,
//   page: 1,
// };

const ImageGallery = ({ queryList, openModal }) => {
  return (
    <StyledImageGallery>
      {queryList.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={openModal}
        />
      ))}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  queryList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openModal: PropTypes.func.isRequired,
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

// =-------------------------------------------старая версия
// import React, { Component } from 'react';
// import fetchImages from 'services/fetchImages';
// import Loader from 'components/Loader';
// import ImageGalleryItem from './ImageGalleryItem';
// import Modal from 'components/Modal';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import Button from 'components/Button';
// // import { toast } from 'react-toastify';

// const Status = {
//   START: 'start',
//   LOADING: 'loading',
//   SUCCSESS: 'succsess',
//   FAIL: 'fail',
// };
// // const INITIAL_STATE = {
// //   //   showButton: true,
// //   queryList: [],
// //   //   status: Status.START,
// //   //   showModal: false,
// //   largeImage: null,
// //   tags: null,
// //   page: 1,
// // };

// class ImageGallery extends Component {
//   state = {
//     page: 1,
//     queryList: [],
//     status: Status.START,
//     showModal: false,
//     showBtn: false,
//     largeImage: null,
//     tags: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.query;
//     const nextQuery = this.props.query;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;
//     console.log(prevQuery, nextQuery);

//     try {
//       if (prevQuery !== nextQuery) {
//         this.setState({
//           status: Status.LOADING,
//           page: 1,
//           queryList: [],
//           showBtn: false,
//         });
//         const searchResult = await fetchImages(nextQuery, nextPage);
//         if (searchResult.hits.length === 0) {
//           //   toast(`Sorry, there are no more images.`);
//           this.setState({ status: Status.FAIL });
//         }
//         if (searchResult.hits.length !== 12) {
//           this.setState({
//             queryList: [...searchResult.hits],
//             status: Status.SUCCSESS,
//           });
//         } else {
//           this.setState({
//             showBtn: true,
//             queryList: [...searchResult.hits],
//             status: Status.SUCCSESS,
//           });
//         }
//       }
//       if (prevQuery === nextQuery && prevPage !== nextPage) {
//         const searchResult = await fetchImages(nextQuery, nextPage);
//         if (searchResult.hits.length !== 12) {
//           this.setState({
//             showBtn: false,
//             queryList: [...prevState.queryList, ...searchResult.hits],
//           });
//         }
//         if (searchResult.hits.length === 12) {
//           this.setState({
//             queryList: [...prevState.queryList, ...searchResult.hits],
//           });
//         }
//       }
//       // console.log(searchResult.hits);
//     } catch (error) {
//       this.setState({ status: Status.FAIL });
//     }
//   }

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

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));

//     // console.log(prevState.page);
//   };

//   render() {
//     const { status, queryList, showModal, showBtn } = this.state;
//     const { query } = this.props;
//     // const openModal = this.props.onOpenModal;

//     if (status === 'start') {
//       return <StyledNotification>Type something...</StyledNotification>;
//     }

//     if (status === 'loading') {
//       return <Loader query={query} />;
//     }

//     if (status === 'fail') {
//       return <StyledNotification>There is nothing...</StyledNotification>;
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
//           {showBtn && <Button loadMore={this.loadMore}>Load more</Button>}
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
// }

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
// const StyledNotification = styled.h2`
//   font-size: 40px;
//   text-align: center;
//   margin-top: 20px;
// `;

// export default ImageGallery;
