import axios from 'axios';

const API_URI = 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/prod';
/*
  Basic Data Service setup.
  Setup as a 'middleware' for Redux, this functions identically to a Reducer, and is given actions
  from next() before the actual Reducer. Action names can be specific to whatever API you're calling
  and since this is not an actual Reducer, it can use next() without any issues.

  Other API libraries can be placed in this directory, and imported here. Just export them so that
  any other module that imports 'api' can have access to them, and/or use their functionality in this file.
*/

const data_service = store => next => action => {
  const { status } = store.getState();
  const data = action.payload || {};
  next(action)
  switch (action.type) {
    case 'API:GET_BLOGS':
      const { limit, offset } = data;
      next({ type: 'STATUS:LOADING', payload: 'GET_BLOGS' });
      axios.get(`${API_URI}/blog/list?limit=${limit || 10}&offset=${offset || 0}&prefix=`)
        .then(({ data }) => {
          let blogs = {};
          data.map(blog => {
            blogs[blog.blog_id] = blog;
          });
          next({ type: 'API:UPDATE', payload: { blogs } });
          next({ type: 'STATUS:LOADED', payload: 'GET_BLOGS' });
        })
        .catch(error => {
          next({ type: 'STATUS:ERROR', payload: { name: 'GET_BLOGS', error } });
        });
      break;
    case 'API:GET_BLOG':
      const { post } = data;
      if (status.loaded.includes(`GET_BLOG_${post.blog_id}`) && !data.refresh) break;
      next({ type: 'STATUS:LOADING', payload: `GET_BLOG_${post.blog_id}` });
      axios.get(`https://s3.amazonaws.com/dataskeptic.com/${post.src_file}`)
        .then(({ data }) => {
          next({ type: 'API:UPDATE', payload: { blogs: {
            [post.blog_id]: { src: data }
          } } });
          next({ type: 'STATUS:LOADED', payload: `GET_BLOG_${post.blog_id}` });
        })
        .catch(error => {
          next({ type: 'STATUS:ERROR', payload: { name: `GET_BLOG_${post.blog_id}`, error } });
        });
      break;
    default:
      break;
  }
};

export default data_service;
