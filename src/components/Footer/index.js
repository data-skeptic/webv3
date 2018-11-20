import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles.css';

const Footer = props => {
  const links = {
    Content: {
      Bot: '/',
      Podcast: '/podcast',
      Blog: '/blog',
      Store: '/store',
      Membership: '/membership',
    },
    'Data Skeptic': {
      About: '/about',
      Membership: '/membership',
      Store: '/store',
      Contact: '/contact'
    },
    Connect: {
      Twitter: 'https://twitter.com/dataskeptic',
      Facebook: 'https://www.facebook.com/dataskeptic',
      YouTube: 'https://youtube.com/dataskeptic',
    },
    Subscribe: {
      iTunes: 'https://itunes.apple.com/podcast/the-data-skeptic-podcast/id890348705',
      'Google Play': 'https://play.google.com/music/m/Ibr6e2jb7ot6m6gupwdjgsfmoqa?t=Data_Skeptic',
      Stitcher: 'http://www.stitcher.com/s?fid=50561&amp;refid=stpr',
      'RSS Feed': '/api/blog/rss',
    }
  };
  return (
    <footer id="main-footer" className="navbar-dark bg-dark">
      <div className="container">
        <div className="row">
          <div className="col text-left">
            <p><img src="/img/logo.svg" /></p>
            <p><small>Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.</small></p>
          </div>
          {Object.keys(links).map((category, n) => (
            <div className="col" key={n}>
              <p className="lead">{category}</p>
              <ul className="list-unstyled mr-auto">
                {Object.keys(links[category]).map((name, i) => (
                  <li key={i}>
                    {links[category][name].indexOf('http') && (
                      <Link to={links[category][name]}>{name}</Link>
                    ) || (
                      <a href={links[category][name]}>{name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default connect(state => ({
  status: state.status,
  account: state.account,
}))(Footer);
