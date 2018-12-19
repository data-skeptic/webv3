import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import Player from 'Components/Player';

class Corporate extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch({ type: 'STATUS:READY' });
  }
  handleEvent(event_name, event_data = {}) {
    switch (event_name) {
      default:
        return event => {
          console.warn( `${this.constructor.name}::EVENT`, `No event handler for, "${event_name}".`, { event_data, event } );
        };
    }
  }
  render() {
    return (
      <main className="container">
        <h2>Data Skeptic LLC</h2>
        <p>
          In addition to producing the most popular data science podcast on iTunes, Stitcher, Pandora,
          Spotify, and other outlets, we are also a boutique consulting company.  Data Skeptic helps
          small and medium enterprise organizations level up their data science through custom solution
          development, team building, and training.  If you have a problem, if no one else can help,
          and if you can find us, maybe you can hire Data Skeptic.
        </p>
        <p>
          For consulting inquiries, please email <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a>.
        </p>
        <p>
          For advertising inquiries, please email <a href="mailto:alex.evans@dataskeptic.com">alex.evans@dataskeptic.com</a>.
        </p>
        <p>
          For conferences and other appearances, please email <a href="mailto:events@dataskeptic.com">events@dataskeptic.com</a>.
        </p>
        <br/>
        <h3>Careers</h3>
        <br/>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <h4>Data Engineer</h4>
            <table>
              <tr>
                <td><b>Location:</b></td>
                <td>Downtown Los Angeles, CA</td>
              </tr>
              <tr>
                <td><b>Role:</b></td>
                <td>Full time</td>
              </tr>
            </table>
            <p>
              We are looking for a senior data engineer with the following experience:
              <ul>
                <li>Deep knowledge of AWS S3, EC2, RDS, Lambda, DynamoDB, Glue</li>
                <li>3+ years experience in Apache Spark</li>
                <li>Knowledge of parquet and similar formats</li>
                <li>Some experience with text processing ETL</li>
                <li>A passion for big data</li>
              </ul>
            </p>
          </div>
          <div className="col-xs-12 col-sm-6">
            <h4>Music Supervisor</h4>
            <table>
              <tr>
                <td><b>Location:</b></td>
                <td>Los Angeles, CA (or remote)</td>
              </tr>
              <tr>
                <td><b>Role:</b></td>
                <td>Part time</td>
              </tr>
            </table>
            <p>
              Our 2019 season will feature a lot more music than our previous episodes.  We're looking for
              an experienced music supervisor who has helped source and license music for a tv show, webseries,
              podcast, or some similar professional experience.
            </p>
          </div>
        </div>
        <br/>
        <p>
          <center><b>To apply, send your resume to <a href="mailto:careers@dataskeptic.com">careers@dataskeptic.com</a> <br/>with a message about why you are applying.</b></center>
        </p>
        <br/>
        <br/>
        <br/>
        <br/>
      </main>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Corporate);
