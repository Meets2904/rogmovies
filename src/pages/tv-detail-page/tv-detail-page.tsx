import React from 'react'
import { useParams } from 'react-router-dom';

const TvDetailPge = () => {
    const params = useParams();

  return (
    <div>
      <h1 style={{color: 'white'}}>TV shows {params?.tvshowID}</h1>
    </div>
  )
}

export default TvDetailPge;
