import React, { Component } from 'react'

class PinPopup extends Component {
   render(){
      return(
         <div className='dim-layer'>
            <div className='dimBg'></div>
            <div className='pop-layer'>
               <div className="pop-top">
                  <img className="width_100" src={require("../assets/images/pin_explanation.png")} alt="pin"/>
               </div>
               <div className="pop-bottom">
                  <button className="font_18 width_100 height_100" onClick={this.props.close}>{this.props.lang === 'KOR' ? '닫기' : 'CLOSE'}</button>
               </div>
            </div>
         </div>
      );
   }
}

export default PinPopup