import React, { useState } from 'react'
import './NameCard.css'
import PinPopup from './PinPopup';
import * as API from '../common/service'


const NameCard = () => {
   const [language, setLanguage] = useState('KOR');
   const [errMsg, setErrMsg] = useState('');
   const [showPop, setShowPop] = useState(false);
   const [authNum, setAuthNum] = useState([]);


   // 페이지 진입시 유저 정보 가져오기
   async function init(){
      try{
         let params = {
            lang: language,
            auto_keyword: '',
            url: 'ggogo33',
            filename:''
         }

         const rs = await API.init(params)
         console.log(rs)
      }catch(err){
         console.log(err)
      }
   }

   // 핀번호 입력후 유저상세정보 검색
   const getNameCardInfo = async () => {
      try{
         let params = {
            lang: language,
            auto_keyword: authNum.join(''),
            url: 'ggogo33',
            filename:''
         }

         const rs = await API.search(params)

         // rs.data.result 결과
         // {
         //    first_name: "우진"
         //    last_name: "최"
         //    organization: "페이민트"
         //    photo: "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABALDA4MChAOD"
         //    role: "연구개발파트, 데브옵스팀"
         //    seq: 57
         //    title: "매니저"
         // }

         console.log(rs)
      }catch(err){
         console.log(err)
      }
   }

   // 언어바꾸기
   const changeLanguage = (e, lang) => {
      setLanguage(lang)
   };

   // pin 팝업 열기
   const showPinPop = (e) => {
      setShowPop(true);
   }

   // pin 팝업 닫기
   const closePinPop = (e) => {
      setShowPop(false);
   }

   // auth 번호 입력시 authNum 리스트에 추가
   const pushAuthNum = (e, num) => {
      setAuthNum(authNum =>[... authNum, e.target.value])
   }

   // 인풋 값 입력시 자동 다음탭으로
   const autoTab = (e, nextInput) => {
      if(e.target.value.length === 1){
         // 마지막 pin 4자리까지 입력되면 검색
         if(authNum.join('').length === 4){
            getNameCardInfo();
         }
         
         // 입력할때마다 자동 다음탭
         document.getElementById(nextInput).focus();
      }
   }

   


   return (
      <div id="main" className="wrapper">
         <div id="card" className='name_card'>

            {/* 헤더 */}
            <div id='header' className='name_card_top'>
               <span id='logo' className='logo'><img src={require("../assets/images/mint-crew.png")} alt='logo'/></span>
               {
                  function(){
                     if(language == 'KOR') return (<button className="btn_language" onClick={(e) => changeLanguage(e, 'ENG')}>ENG</button>)
                     else return (<button className="btn_language" onClick={(e) => changeLanguage(e, 'KOR')}>KOR</button>)
                  }()
               }
               <div id="header_content" className="header_content">
                  <img id="icon" src={require("../assets/images/pray_rupy.JPG")} className="icon_person" alt="icon"/>
                  {
                     function(){
                        if(language == 'KOR') return (
                           <>
                              <h1 className="name">김민트</h1>
                              <p id="part" className="font_16 margin_top_12" style={{lineHeight: 1.5}}>
                                 <b>{'연구개발파트'}, {'데브옵스팀'}<br/>{'매니저'}</b>
                              </p>
                           </>
                        )
                        else return (
                           <>
                              <h1 className="name">Mint Kim</h1>
                              <p id="part" className="font_16 margin_top_12" style={{lineHeight: 1.5}}>
                                 <b>{'R&D Dept'}, {'Devops Team'}<br/>{'manager'}</b>
                              </p>
                           </>
                        )
                     }()
                  }
               </div>
            </div>

            {/* 인증 */}
            <div className='name_card_bt text-align-center'>
               <div className='input_wrapper'>
                  <input type="tel" id="tel_1" maxLength={1} value={authNum[0] || ''} onInput={(e) => pushAuthNum(e)} onKeyUp={(e) => autoTab(e, 'tel_2')}/>
                  <input type="tel" id="tel_2" maxLength={1} value={authNum[1] || ''} onInput={(e) => pushAuthNum(e)} onKeyUp={(e) => autoTab(e, 'tel_3')}/>
                  <input type="tel" id="tel_3" maxLength={1} value={authNum[2] || ''} onInput={(e) => pushAuthNum(e)} onKeyUp={(e) => autoTab(e, 'tel_4')}/>
                  <input type="tel" id="tel_4" maxLength={1} value={authNum[3] || ''} onInput={(e) => pushAuthNum(e)} onKeyUp={(e) => autoTab(e, 'tel_4')}/>
               </div>

               <div className='pin_num'>
                  <img src={require('../assets/images/pinnum.png')}/>
               </div>
               {
                  function (){
                     if(language == 'KOR') return (
                        <p className='margin_top_16' style={{lineHeight: 1.57}}>
                           <b>{'김민트'}</b>님 명함에 있는<br/><span className='pin' onClick={showPinPop}>PIN번호 4자리</span>를 입력해주세요.
                        </p>
                     )
                     else return (
                        <div className='margin_top_16' style={{lineHeight: 1.57}}>
                           Please enter <span className='pin' onClick={showPinPop}>the 4 digit PIN number</span><br/>on {'MINT'} {'KIM'}'s business card.
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
               {/* <div className='content'>
                  <div className="card_section margin_top_24">
                     <button><img src={require('../assets/images/icon-24-message.png')}/></button>
                     <button><img src={require("../assets/images/icon-24-call.png")}/></button>
                     <p className='card_title'>Mobile.</p>
                     <p className='content'>+82 10<br/>1234 5678</p>
                  </div>
                  <div className='line_white'>
                     <div className='left'></div><div className='right'></div>
                  </div>
                  <div className='card_section'>
                     <button><img src={require('../assets/images/icon-24-mail.png')}/></button>
                     <p className='card_title'>Email.</p>   
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
                        if(language == 'KOR') return (<div className='section_sub_title'>페이민트 주식회사</div>)
                        else return (<div className='section_sub_title'>Paymint Inc.</div>)
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
                     <p>{'서울시 성동구 상원1길 26 서울숲A타워 409호'}<br/>({'04779'})</p>
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


               </div> */}
               {/* </CSSTransition> */}
            {/* </TransitionGroup> */}
         </div>

         { showPop ? <PinPopup lang={language} close={closePinPop}/> : <></> }
      </div>
   );


}

export default NameCard;