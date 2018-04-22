import React from 'react';

export default props => {
  const { suspects, handleReport } = props;
  if (suspects.length) return (
    [
    <h3 key="lineup-head"> Submission History </h3>,
    <div key="lineup-body" className="lineup">
      { suspects.map((suspect, idx) => {
        const criticalMatch = +suspect.percentage > 70,
          matchMsg = suspect.likeness === 'No match' ? `${suspect.likeness}` : `${suspect.likeness} : ${suspect.percentage}% match`
        return (
          <div className="suspect" key={`${idx}-${suspect.data.slice(0, 25)}}`}>
            <div className="suspect-top">
              <p className={criticalMatch ? 'critical' : ''}> {matchMsg} </p>
              { suspect.reported ? 
              <p> REPORTED </p> :
              suspect.likeness === 'No match' ? null : <button className="suspect-report" onClick={handleReport(suspect.data, idx)}> REPORT </button>
              }
            </div>
            <div className="suspect-image">
              <img src={suspect.data}/>
            </div>
          </div>
        )
      })
      }
    </div>
    ]
  )
  else return null
}