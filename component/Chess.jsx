import React from 'react';


function Chess({type, cover}) {
  return <div>
      <li className=' w-6 h-6' key={'row'+ j}>{chessList[chess[i + j]]}</li>
  </div>;
}

export default Chess;
