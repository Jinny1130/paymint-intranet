import React, { useState, useEffect } from 'react'
import './NameCard.css'
import PinPopup from './PinPopup';
import * as API from '../common/service'
import MemberDetail from './MemberDetail';


const NameCard = () => {
   const [language, setLanguage] = useState('KOR');
   const [loadingMsg, setLoadingMsg] = useState('');
   const [showPop, setShowPop] = useState(false);
   const [authNum1, setAuthNum1] = useState('');
   const [authNum2, setAuthNum2] = useState('');
   const [authNum3, setAuthNum3] = useState('');
   const [authNum4, setAuthNum4] = useState('');

   const [memberInfo, setMemberInfo] = useState({}); // 멤버 정보

   const [showDetail, setShowDetail] = useState(false);


   useEffect(() =>{
      init();
   },[language])

   // 페이지 진입시 유저 정보 가져오기
   async function init(){
      try{
         let params = {
            lang: language,
            auth_keyword: authNumber(),
            url: window.location.pathname.replace('/', ''),
            filename:''
         }

         const rs = await API.init(params)

         setMemberInfo(rs.data.result);
      }catch(err){
         console.log(err)
      }
   }

   // 핀번호 입력후 유저상세정보 검색
   const getNameCardInfo = async () => {
      try{
         let params = {
            lang: language,
            auth_keyword: authNumber(),
            url: window.location.pathname.replace('/', ''),
            filename:''
         }
         
         const rs = await API.search(params);

         if(rs.data.code !== '0000'){
            msg('error');
            clearAuthNumber();
            return;
         }
         setMemberInfo(rs.data.result);
         setShowDetail(true);
         msg('success');

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
      let number = e.target.value;

      switch(num){
         case 'one' : 
         setAuthNum1(number);
         break;
         case 'two' : 
         setAuthNum2(number);
         break;
         case 'three' : 
         setAuthNum3(number);
         break;
         case 'four' : 
         setAuthNum4(number);
         break;
      }
      // setAuthNum(authNum =>[... authNum, number]);
   }

   const onlyNumber = (value) => {
      return value.replace(/[^0-9]/g, '');
   }

   // 인풋 값 입력시 자동 다음탭으로
   const autoTab = (e, nextInput) => {
      if(e.target.value.length === 1){
         // 마지막 pin 4자리까지 입력되면 검색
         let authNum = authNumber();
         if(authNum.length === 4){
            msg('loading');
            getNameCardInfo();
            return;
         }
         
         // 입력할때마다 자동 다음탭
         if(!nextInput){
            document.getElementById('tel_4').blur();
            return;  
         }
         document.getElementById(nextInput).focus();
      }
   }
   // 오류시 인증번호 초기화
   const clearAuthNumber = () => {
         setAuthNum1("");
         setAuthNum2("");
         setAuthNum3("");
         setAuthNum4("");
      return;
   }

   function authNumber(){
      return authNum1 + authNum2 + authNum3 + authNum4;
   }

   // 페이지 이동
   const showPage = (e, url) => {
      window.location.href = url;
   }

   // 핀코드 검색 결과
   const msg = (data) => {
      setLoadingMsg(data);
   }

   // 로딩
   const loading = () => {
      if(loadingMsg === 'loading'){
         return(
            <div className='loading margin_top_28'>
               <div className='line'></div>
               <div className='line'></div>
               <div className='line'></div>
               <div className='line'></div>
            </div>
         )
      } else if(loadingMsg === 'error'){
         if(language === 'KOR'){
            return (
               <div className='speech-bubble center_v'>
                  <p>올바른 번호가 아닙니다.<br/>번호를 확인하시고 다시 입력해주세요.</p>
               </div>
            )
         } else {
            return (
               <div className='speech-bubble center_v'>
                  <p>Please check the number <br/> and enter it again.</p>
               </div>
            )
         }
      }
   }

   function scroll (e) {
      console.log(e.target.scrollTop)
      let scrollTop = e.target.scrollTop;
      let header = document.getElementById('header');
      let scrollPosition = document.getElementById('card').scrollTop;
      let heightTest = 320 - scrollPosition;

      if(scrollTop > 0 && scrollTop < 212){
         if(scrollTop > 100){
            header.style.boxShadow = '0 6px 12px 0 rgba(0, 0, 0, 0.1)';
         } else{
            header.style.boxShadow = '0 1px 0 0 rgba(0, 0, 0, 0.1)';
         }

         header.style.height = heightTest + 'px';
         document.getElementById("part").style.opacity = 1 - (scrollTop/100) + '';
         document.getElementById("logo").style.top = getSize(32,-64,scrollTop);
         document.getElementById("language").style.top = getSize(32,-64,scrollTop);
         document.getElementById("icon").style.width = getSize(96,48,scrollTop);
         document.getElementById("icon").style.height = getSize(96,48,scrollTop);
         document.getElementById("icon").style.marginBottom = getSize(16,8,scrollTop);
         document.getElementById("name").style.fontSize = getSize(32,16,scrollTop);
         document.getElementById("header_content").style.top = getSize(84,20,scrollTop);
      }
      
   }

   function getSize(max, min, scrollTop){
      return max - ((max-min)/211)*scrollTop + 'px'
   }

   
   return (
      <div id="main" className="wrapper">
         <div id="card" className='name_card' onScroll={scroll}>

            {/* 헤더 */}
            <div id='header' className='name_card_top'>
               <span id='logo' className='logo'><img src={require("../assets/images/mint-crew.png")} alt='logo'/></span>
               {
                  function(){
                     if(language === 'KOR') return (<button className="btn_language" id='language' onClick={(e) => changeLanguage(e, 'ENG')}>ENG</button>)
                     else return (<button className="btn_language" id='language' onClick={(e) => changeLanguage(e, 'KOR')}>KOR</button>)
                  }()
               }
               <div id="header_content" className="header_content">
                  <img id="icon" src={`data:image/png;base64,${memberInfo.photo}`} className="icon_person" alt="icon"/>
                  {
                     function(){
                        if(language === 'KOR') return (
                           <>
                              <h1 className="name" id="name">{memberInfo.last_name}{memberInfo.first_name}</h1>
                              <p id="part" className="font_16 margin_top_12" style={{lineHeight: 1.5}}>
                                 <b>{memberInfo.role}<br/>{memberInfo.title}</b>
                              </p>
                           </>
                        )
                        else return (
                           <>
                              <h1 className="name" id="name">{memberInfo.last_name} {memberInfo.first_name}</h1>
                              <p id="part" className="font_16 margin_top_12" style={{lineHeight: 1.5}}>
                                 <b>{memberInfo.role}<br/>{memberInfo.title}</b>
                              </p>
                           </>
                        )
                     }()
                  }
               </div>
            </div>

            {/* 인증 */}
            { !showDetail ? <div className='name_card_bt text-align-center'>
               <div className='input_wrapper'>
                  <input type="tel" id="tel_1"  value={authNum1} onInput={(e) => pushAuthNum(e, 'one')} onKeyUp={(e) => autoTab(e, 'tel_2')}/>
                  <input type="tel" id="tel_2"  value={authNum2} onInput={(e) => pushAuthNum(e, 'two')} onKeyUp={(e) => autoTab(e, 'tel_3')}/>
                  <input type="tel" id="tel_3"  value={authNum3} onInput={(e) => pushAuthNum(e, 'three')} onKeyUp={(e) => autoTab(e, 'tel_4')}/>
                  <input type="tel" id="tel_4"  value={authNum4} onInput={(e) => pushAuthNum(e, 'four')} onKeyUp={(e) => autoTab(e)}/>
               </div>

               <div className='pin_num'>
                  <img src={require('../assets/images/pinnum.png')} alt='명함이미지예시'/>
               </div>
               {
                  function (){
                     if(language === 'KOR') return (
                        <p className='margin_top_16' style={{lineHeight: 1.57}}>
                           <b>{memberInfo.last_name}{memberInfo.first_name}</b>님 명함에 있는<br/><span className='pin' onClick={showPinPop}>PIN번호 4자리</span>를 입력해주세요.
                        </p>
                     )
                     else return (
                        <div className='margin_top_16' style={{lineHeight: 1.57}}>
                           Please enter <span className='pin' onClick={showPinPop}>the 4 digit PIN number</span><br/>on {memberInfo.last_name} {memberInfo.first_name}'s business card.
                        </div>
                     )
                  }()
               }
               {/* loading 및 erromsg */}
               {loading()}

               <div className='footer'>
                  <img src={require('../assets/images/powered-by-paymint.png')} alt='페이민트로고'/>
               </div>
            </div> : <></>}

            { showDetail ?  <MemberDetail lang={language} member={memberInfo} showPage={showPage} scroll={scroll}   ></MemberDetail> : <></> }
         </div>

         { showPop ? <PinPopup lang={language} close={closePinPop}/> : <></> }
      </div>
   );


}

export default NameCard;