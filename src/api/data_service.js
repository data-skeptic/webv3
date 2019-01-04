import axios from 'axios';

const { DATASKEPTIC_API_URI } = process.env;
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
  next(action);
  if (status.loaded.includes(action.type) && !data.refresh) return;
  switch (action.type) {
    case 'API:GET_BLOGS':
      var { limit, offset } = data;
      next({ type: 'STATUS:LOADING', payload: 'GET_BLOGS' });
      axios.get(`${DATASKEPTIC_API_URI}/blog/list?limit=${limit || 10}&offset=${offset || 0}&prefix=`)
        .then(({ data }) => {
          var blogs = {
            all: Object.values(data).sort((a, b) => ((new Date(a.publish_date)) < (new Date(b.publish_date)) ? 1 : -1)),
          };
          data.map(blog => {
            var path = blog.prettyname.substr(1,).split('/');
            blog.category = path[0];
            blog.year = path[1];
            blog.name = path[2];
            blogs[blog.category] = blogs[blog.category] || {};
            blogs[blog.category][blog.year] = blogs[blog.category][blog.year] || {};
            blogs[blog.category][blog.year][blog.name] = blog;
          });
          next({ type: 'API:UPDATE', payload: { blogs } });
          next({ type: 'STATUS:LOADED', payload: 'GET_BLOGS' });
        })
        .catch(error => {
          next({ type: 'STATUS:ERROR', payload: { name: 'GET_BLOGS', error } });
        });
      break;
    case 'API:GET_BLOG':
      var { post } = data;
      if (status.loaded.includes(`GET_BLOG_${post.blog_id}`) && !data.refresh) break;
      next({ type: 'STATUS:LOADING', payload: `GET_BLOG_${post.blog_id}` });
      axios.get(`https://s3.amazonaws.com/dataskeptic.com/${post.src_file}`)
        .then(({ data }) => {
          next({
            type: 'API:UPDATE', payload: {
              blogs: {
                [post.category]: {
                  [post.year]: {
                    [post.name]: { src: data }
                  }
                }
              }
            }
          });
          next({ type: 'STATUS:LOADED', payload: `GET_BLOG_${post.blog_id}` });
        })
        .catch(error => {
          next({ type: 'STATUS:ERROR', payload: { name: `GET_BLOG_${post.blog_id}`, error } });
        });
      break;
    case 'API:GET_PODCASTS':
      var { limit, offset } = data;
      next({ type: 'STATUS:LOADING', payload: 'GET_PODCASTS' });
      axios.get(`${DATASKEPTIC_API_URI}/podcast/episodes/list?limit=${limit || 10}&offset=${offset || 0}&prefix=`)
        .then(({ data }) => {
          var { episodes } = data;
          var podcasts = {
            all: Object.values(episodes).sort((a, b) => ((new Date(a.publish_date)) < (new Date(b.publish_date)) ? 1 : -1)),
          };
          episodes.map(podcast => {
            var path = podcast.prettyname.substr(1,).split('/');
            podcast.category = path[0];
            podcast.year = path[1];
            podcast.name = path[2];
            podcasts[podcast.category] = podcasts[podcast.category] || {};
            podcasts[podcast.category][podcast.year] = podcasts[podcast.category][podcast.year] || {};
            podcasts[podcast.category][podcast.year][podcast.name] = podcast;
          });
          next({ type: 'API:UPDATE', payload: { podcasts } });
          next({ type: 'STATUS:LOADED', payload: 'GET_PODCASTS' });
        })
        .catch(error => {
          next({ type: 'STATUS:ERROR', payload: { name: 'GET_PODCASTS', error } });
        });
      break;
    case 'API:GET_PODCAST':
      var { post } = data;
      if (status.loaded.includes(`GET_PODCAST_${post.blog_id}`) && !data.refresh) break;
      next({ type: 'STATUS:LOADING', payload: `GET_PODCAST_${post.blog_id}` });
      axios.get(`https://s3.amazonaws.com/dataskeptic.com/${post.src_file}`)
        .then(({ data }) => {
          next({
            type: 'API:UPDATE', payload: {
              podcasts: {
                [post.category]: {
                  [post.year]: {
                    [post.name]: { src: data }
                  }
                }
              }
            }
          });
          next({ type: 'STATUS:LOADED', payload: `GET_PODCAST_${post.blog_id}` });
        })
        .catch(error => {
          next({ type: 'STATUS:ERROR', payload: { name: `GET_PODCAST_${post.blog_id}`, error } });
        });
      break;
    case 'API:GET_CONTRIBUTORS':
      next({ type: 'STATUS:LOADING', payload: 'GET_CONTRIBUTORS' });
      axios.get(`${DATASKEPTIC_API_URI}/blog/contributors/list`)
        .then(({ data }) => {
          var contributors = [];
          Object.keys(data).map(name => {
            contributors.push({ name, ...data[name] });
          });
          next({ type: 'API:UPDATE', payload: { contributors } });
          next({ type: 'STATUS:LOADED', payload: 'GET_CONTRIBUTORS' });
        })
        .catch(error => {
          next({ type: 'STATUS:ERROR', payload: { name: 'GET_CONTRIBUTORS', error } });
        });
      break;
    default:
      break;
  }
};

export default data_service;
