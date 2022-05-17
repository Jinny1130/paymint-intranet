import React from "react";

const MemberDetail = (props) => {

    return (
        <div className='content' onScroll={(e) => props.scroll(e)}>
                  <div className="card_section">
                     <button onClick={(e) => props.showPage(e, 'sms:' + props.member.cell_phone1+ props.member.cell_phone2+ props.member.cell_phone3)}><img src={require('../assets/images/icon-24-message.png')} alt="icon"/></button>
                     <button onClick={(e) => props.showPage(e, 'tel:' + + props.member.cell_phone1+ props.member.cell_phone2+ props.member.cell_phone3)}><img src={require("../assets/images/icon-24-call.png")} alt="icon"/></button>
                     <p className='card_title'>Mobile.</p>
                     <p className='content'>+82 {props.member.cell_phone1}<br/>{props.member.cell_phone2} {props.member.cell_phone3}</p>
                  </div>
                  <div className='line_white'>
                     <div className='left'></div><div className='right'></div>
                  </div>
                  <div className='card_section'>
                     <button onClick={(e) => props.showPage(e, 'mailto:' + props.member.work_email + '@paymint.co.kr')}><img src={require('../assets/images/icon-24-mail.png')} alt="icon"/></button>
                     <p className='card_title'>Email.</p>   
                     <p className='content'>{props.member.work_email}<br/>@paymint.co.kr</p>
                  </div>
                  <div className="card_section_gr">
                     <p className="card_title margin_bt_16">Favorite Word.</p>
                     {
                        function(){
                           let favorite_word = props.member.note.split(",");
                           return (<div><span>{favorite_word[0]}</span> <span>{favorite_word[1]}</span> <span>{favorite_word[2]}</span></div> )
                        }()
                     }
                  </div>
                  {
                     function(){
                        if(props.lang === 'KOR') return (<div className='section_sub_title'>페이민트 주식회사</div>)
                        else return (<div className='section_sub_title'>Paymint Inc.</div>)
                     }()
                  }
                  <div className="card_section small">
                     <button onClick={(e) => props.showPage(e, 'http://www.paymint.co.kr/hp/index.html')}><img src={require('../assets/images/icon-24-web.png')} alt="icon"/></button>
                     <p className="card_title">Web.</p>
                     <p>paymint.co.kr</p>
                  </div>
                  <div className='line_white'>
                     <div className='left'></div><div className='right'></div>
                  </div>
                  <div className="card_section small">
                     <button onClick={(e) => props.showPage(e, 'https://goo.gl/maps/6TKxkHHFitLKFHXu8')}><img src={require("../assets/images/icon-24-map.png")} alt="icon" /></button>
                     <p className="card_title">Add.</p>
                     {
                        function(){
                           if(props.lang === 'KOR') return (<p>서울시 성동구 상원1길 26 서울숲A타워 409호<br/>04779</p>)
                           else return (<p>(04779) #409, 26, Sangwon 1-gil, Seongdong-gu Seoul Rep. OF KOREA</p>)
                        }()
                     }
                     {/* <p>{'서울시 성동구 상원1길 26 서울숲A타워 409호'}<br/>({'04779'})</p> */}
                  </div>
                  <div className="line_white">
                     <div className="left"></div><div className="right"></div>
                  </div>
                  <div className="card_section small">
                     <button onClick={(e) => props.showPage(e, 'tel:' + props.member.work_phone)}><img src={require("../assets/images/icon-24-call.png")} alt="icon"/></button>
                     <p className="card_title">Tel.</p>
                     <p>{props.member.work_phone}</p>
                  </div>
                  <div className="line_white">
                     <div className="left"></div><div className="right"></div>
                  </div>
                  <div className="card_section small">
                     <p className="card_title">Fax.</p>
                     <p>{props.member.work_fax}</p>
                  </div>
                  <button className="btn_down"><img src={require("../assets/images/icon-32-m.png")} alt="icon"/>연락처 다운로드</button>
                  <div className="footer_gr">
                     <img src={require("../assets/images/powered-by-paymint.png")} alt="powered"/>
                  </div>


        </div>
    )
}


export default MemberDetail;