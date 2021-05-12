import React from 'react';
import LeftBox from './leftBox/LeftBox';
import RightBox from './rightBox/RightBox';

export default function ContentBox(props) {
   const { pagePointer } = props;
   return (
      <div className="content-box">
         <LeftBox pagePointer={pagePointer} />
         <RightBox />
      </div>
   );
}
