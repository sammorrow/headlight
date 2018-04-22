import React, { Component } from 'react';
import axios from 'axios';
import {Lineup} from './';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      suspects: [],
      newImage: '',
      reportMsg: '    '
    },
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }


  handleLoad(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = (e) => {
      this.setState({
        file,
        newImage: e.currentTarget.result
      });
    }
    reader.readAsDataURL(file)
  }

  handleSubmit(e){
    e.preventDefault()
    const bodyFormData = new FormData();
    bodyFormData.set('image_contents', this.state.newImage)
    axios({
      method: 'post',
      url: '/lookup', 
      data: bodyFormData,
      config: { headers: {'Content-Type' : 'application/x-www-form-urlencoded'}}
    }) 
    .then(res => res.data)
    .then(response => {
      this.setState({
        newImage: '',
        suspects: this.state.suspects.concat({
          data: this.state.newImage,
          likeness: response.closest_match,
          percentage: response.percent_match,
          reported: false
        })
      })
    })
  }

  handleReport(imageData, matchIdx){
    return e => {
      e.preventDefault();
      const bodyFormData = new FormData();
      bodyFormData.set('image_contents', this.state.newImage)

      axios({
        method: 'post',
        url: 'https://www.headlightlabs.com/api/gcpd_report', 
        data: bodyFormData,
        config: { headers: {'Content-Type' : 'application/x-www-form-urlencoded'}}
      })
      .then(res => res.data)
      .then(response => {
        this.setState({
          reportMsg: response.status,
          suspects: this.state.suspects.map((suspect, idx) => idx === matchIdx ? Object.assign({}, {...suspect}, {reported: true}) : suspect)
        })
      })
    }
  }

  render(){
    const { handleLoad, handleSubmit, handleReport } = this;
    const { suspects, newImage, reportMsg } = this.state
    return (
      <div>
        <h1> GOTHAM ANONYMOUS TIP SERVICE </h1>
          <p> Seen any shifty fellows with blotched makeup lurking in the shadows? Check them against our database and bring them into the light. </p>
        <h3> { reportMsg } </h3>
        <fieldset>
        <legend> Crook Submission Form </legend>
          <div className="crook-lookup">
            <div>
              <input className="crook-loader" type="file" id="file" onChange={handleLoad} />
              <label htmlFor="file">Choose a file</label>
              <button className="crook-submit" type="submit" onClick={handleSubmit}> Submit </button>
            </div>
            { newImage ? <div>
              <p> Your suspect: </p>
              <img className="preview" src={newImage} />
              </div> : null
            }
          </div>
        </fieldset>
        <Lineup suspects={suspects} handleReport={handleReport} />
      </div>
    )
  }
}