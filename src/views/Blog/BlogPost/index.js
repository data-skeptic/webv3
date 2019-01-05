import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './styles.scss';

import Loading from 'Components/Loading';
import Button from 'Components/Button';

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { post, dispatch } = this.props;
    dispatch({ type: 'API:GET_BLOG', payload: { post } });
    dispatch({ type: 'API:GET_CONTRIBUTORS' });
  }
  handleEvent(event_name, event_data = {}) {
    const { dispatch } = this.props;
    switch (event_name) {
      case 'ON_CLICK':
        return event => {
          const name = event_data.name || event.target.name;
          switch(name) {
            case 'play_button':
              const { title, subtitle, src, art } = event_data;
              dispatch({ type: 'PLAYER:PLAY', payload: { title, subtitle, src, art }});
              break;
            default:
              break;
          };
        }
      default:
        return event => {
          console.warn( `${this.constructor.name}::EVENT`, `No event handler for, "${event_name}".`, { event_data, event } );
        };
    }
  }
  render() {
    const { api, status, post } = this.props;
    const { contributors } = api;
    const { blog_id, related, src } = post;
    // TODO: All of this logic should really be done outside of render().
    const blog_authors = contributors.filter(contributor => post.author.toLowerCase() === contributor.name);
    const blog_contributors = contributors.filter(contributor => post.contributors.includes(contributor.name));
    const people = related.filter(item => item.type === 'person');
    const images = related.filter(item => item.type === 'homepage-image');
    const audio = related.filter(item => item.type === 'mp3');
    return (
      <Loading on={status.loaded.includes(`GET_BLOG_${blog_id}`)}>
        {audio.length > 0 && audio.map((file_data, f) => {
          const audio_bundle = {
            title: file_data.title,
            subtitle: file_data.author || post.author || '',
            src: file_data.dest,
            art: images[0] ? images[0].dest : undefined,
          };
          const date = moment(post.publish_date).format("MMMM Do YYYY");
          return (
            <aside className="BlogAudio alert alert-warning" key={f}>
              <div className="row mb-0">
                <div className="col-sm-9">
                  {people[0] && <img className="speaker" src={people[0].dest} title={people[0].title} />}
                  <h5 className="d-inline-block mb-0">{file_data.title}<small className="d-block font-italic">{date}</small></h5>
                </div>
                <div className="col-sm-3 text-right">
                  <Button className="btn-lg" icon="fa fa-play" onClick={this.handleEvent('ON_CLICK', { name: 'play_button', ...audio_bundle })}>Play</Button>
                </div>
              </div>
            </aside>
          );
        })}
        <article className="BlogPost" dangerouslySetInnerHTML={{ __html: src }} />
        {blog_authors.length + blog_contributors.length > 0 && (
          <article className="BlogContributors">
            <div className="row">
              {blog_authors.map((author, a) => (
                <div className="contributor-card col col-md-6 col-lg-4" key={a}>
                  <div className="card shadow">
                    {author.img && (
                      <div className="contributor-img text-center">
                        <img className="rounded border" src={author.img} alt={author.prettyname} />
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{author.prettyname}</h5>
                      <p className="card-text">{author.bio}</p>
                    </div>
                    <div className="card-footer">
                      <ul className="list-inline row mb-0">
                        <li class="list-inline-item col text-center"><a className="btn btn-primary shadow rounded" title={`@${author.twitter}`} href={`https://twitter.com/${author.twitter}`}><i className="fa fa-twitter" /></a></li>
                        <li class="list-inline-item col text-center"><a className="btn btn-primary shadow rounded" title={author.linkedin} href={author.linkedin}><i className="fa fa-linkedin" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              {blog_contributors.map((author, a) => (
                <div className="contributor-card col col-md-6 col-lg-4" key={a}>
                  <div className="card shadow">
                    {author.img && (
                      <div className="contributor-img text-center">
                        <img className="rounded border" src={author.img} alt={author.prettyname} />
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{author.prettyname}</h5>
                      <p className="card-text">{author.bio}</p>
                    </div>
                    <div className="card-footer">
                      <ul className="list-inline row mb-0">
                        <li class="list-inline-item col text-center"><a className="btn btn-primary shadow rounded" title={`@${author.twitter}`} href={`https://twitter.com/${author.twitter}`}><i className="fa fa-twitter" /></a></li>
                        <li class="list-inline-item col text-center"><a className="btn btn-primary shadow rounded" title={author.linkedin} href={author.linkedin}><i className="fa fa-linkedin" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              {people.map((author, a) => (
                <div className="contributor-card col col-md-6 col-lg-4" key={a}>
                  <div className="card shadow">
                    {author.dest && (
                      <div className="contributor-img text-center">
                        <img className="rounded border" src={author.dest} alt={author.title} />
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{author.title}</h5>
                      <p className="card-text">{author.body}</p>
                    </div>
                    <div className="card-footer"></div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}
      </Loading>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(BlogPost);
