import React from 'react';
import LeftBox from './leftBox/LeftBox';
import RightBox from './rightBox/RightBox';

export default function ContentBox(props) {
   const { setPagePointer } = props;
   return (
      <div className="content-box">
         <LeftBox setPagePointer={setPagePointer} />
         <RightBox />
      </div>
   );
}
