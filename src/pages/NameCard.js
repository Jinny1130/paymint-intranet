import React, { Component } from 'react'
import './NameCard.css'

class NameCard extends Component {
   constructor(props){
      super(props);
      this.state = {
         language: 'KOR',
         errMsg: '',
      }
      this.changeLanguage = this.changeLanguage.bind(this);
   }
   

   changeLanguage(lang){
      console.log(lang)
      // this.setState({
      //    language: lang
      // })
   }


   render() {
      const { language } = this.state
      const { errMsg } = this.state

      return (
         <div id="main" className="wrapper">
            <div id="card" className='name_card'>

               {/* 헤더 */}
               <div id='header' className='name_card_top'>
                  <span id='logo' className='logo'><img src={require("../assets/images/mint-crew.png")} alt='logo'/></span>
                  {
                     function(){
                        if(language == 'KOR') return (<button className="btn_language" onClick={() => this.changeLanguage('ENG')}>ENG</button>)
                        else return (<button className="btn_language" onClick={() => this.changeLanguage('KOR')}>KOR</button>)
                     }()
                  }
                  <div id="header_content" className="header_content">
                     <img id="icon" src={require("../assets/images/pray_rupy.JPG")} className="icon_person" alt="icon"/>
                     {
                        function(){
                           if(language == 'KOR') return (<h1 className="name">김민트</h1>)
                           else return (<h1 className="name">Mint Kim</h1>)
                        }()
                     }
                     <p id="part" className="font_16 margin_top_12" style={{lineHeight: 1.5}}>MEMBER.role && MEMBER.title</p>
                  </div>
               </div>

               {/* 인증 */}
               <div className='name_card_bt text-align-center'>
                  <div className='input_wrapper'>
                     <input type="tel" id="tel_1" maxLength={1} />
                     <input type="tel" id="tel_2" maxLength={1} />
                     <input type="tel" id="tel_3" maxLength={1} />
                     <input type="tel" id="tel_4" maxLength={1} />
                  </div>

                  <div className='pin_num'>
                     <img src={require('../assets/images/pinnum.png')}/>
                  </div>
                  {
                     function (){
                        if(language == 'KOR') return (
                           <p className='margin_top_16' style={{lineHeight: 1.57}}>
                              <b>MINT KIM</b>님 명함에 있는<br/><span className='pin'>PIN번호 4자리</span>를 입력해주세요.
                           </p>
                        )
                        else return (
                           <div className='margin_top_16' style={{lineHeight: 1.57}}>
                              Please enter <span className='pin'>the 4 digit PIN number</span><br/>on MINT KIM's business card.
                           </div>
                        )
                     }()
                  }
                  {
                     function(){
                        if(errMsg !== '' && language === 'KOR') return (
                           <div className='speech-bubble center_v'>
                              <p>올바른 번호가 아닙니다.<br/>번호를 확인하시고 다시 입력해주세요.</p>
                           </div>
                        )
                        else if(errMsg !== '' && language !== 'KOR') return (
                           <div className='speech-bubble center_v'>
                              <p>Please check the number <br/> and enter it again.</p>
                           </div>
                        )
                     }()
                  }

                  {/* <div className='loading margin_top_28'>
                     <div className='line'></div>
                     <div className='line'></div>
                     <div className='line'></div>
                     <div className='line'></div>
                  </div> */}

                  <div className='footer'>
                     <img src={require('../assets/images/powered-by-paymint.png')}/>
                  </div>
               </div>

               {/* 명함 */}
               {/* <TransitionGroup className="transition-group"> */}
                  {/* <CSSTransition className="slide-up"> */}
                  <div className='content'>
                     <div className="card_section margin_top_24">
                        <button><img src={require('../assets/images/icon-24-message.png')}/></button>
                        <button><img src={require("../assets/images/icon-24-call.png")}/></button>
                        <p className='card_title'>Mobile.</p>
                        <p className='content'>+82 10-1234-5678</p>
                     </div>
                     <div className='line_white'>
                        <div className='left'></div><div className='right'></div>
                     </div>
                     <div className='card_section'>
                        <button><img src={require('../assets/images/icon-24-mail.png')}/></button>
                        <p className='card_title'>Web.</p>   
                        <p className='content'>mint11<br/>@paymint.co.kr</p>
                     </div>
                     <div className="card_section_gr">
                        <p className="card_title margin_bt_16">Favorite Word.</p>
                        <span>Hi</span>
                        <span>Hello</span>
                        <span>Bye</span>
                     </div>
                     {
                        function(){
                           if(language == 'KOR') return (<div className='section_sub_title'> 주식회사</div>)
                           else return (<div className='section_sub_title'> Inc.</div>)
                        }()
                     }
                     <div className="card_section small">
                        <button><img src={require('../assets/images/icon-24-web.png')}/></button>
                        <p className="card_title">Web.</p>
                        <p>paymint.co.kr</p>
                     </div>
                     <div className='line_white'>
                        <div className='left'></div><div className='right'></div>
                     </div>
                     <div className="card_section small">
                        <button><img src={require("../assets/images/icon-24-map.png")} alt="icon" /></button>
                        <p className="card_title">Add.</p>
                        <p>서울 주소주소주소 <br/> 12345</p>
                     </div>
                     <div className="line_white">
                        <div className="left"></div><div className="right"></div>
                     </div>
                     <div className="card_section small">
                        <button><img src={require("../assets/images/icon-24-call.png")} alt="icon"/></button>
                        <p className="card_title">Tel.</p>
                        <p>+82 10-1234-5678</p>
                     </div>
                     <div className="line_white">
                        <div className="left"></div><div className="right"></div>
                     </div>
                     <div className="card_section small">
                        <p className="card_title">Fax.</p>
                        <p>+82 10-1212-3434</p>
                     </div>
                     <button className="btn_down"><img src={require("../assets/images/icon-32-m.png")} alt="icon"/>연락처 다운로드</button>
                     <div className="footer_gr">
                        <img src={require("../assets/images/powered-by-paymint.png")} alt="powered"/>
                     </div>


                  </div>
                  {/* </CSSTransition> */}
               {/* </TransitionGroup> */}

            </div>
         </div>
      );
   }
}

export default NameCard;