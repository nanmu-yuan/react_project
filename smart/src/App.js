import React, { useEffect, useState } from 'react'

import './App.scss'
const fetchFunSingadd = (data) => {
  const singadd = window.fetch('https://publicapi.allindesk.com/api/shopify/singadd', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return new Promise((solve, reject) => {
    singadd.then(res => {
      return solve(res.json())
    })
  })
}
const fetchFunSinglist = (data) => {
  return new Promise((solve, reject) => {
    window.fetch(`https://publicapi.allindesk.com/api/shopify/singlist/${data}`).then(res => {
      return solve(res.json())
    })
  })
}
function App(props) {
  const [days, setDay] = useState([]);
  const [signStatus,setSignStatus]  = useState({
    type:'',
    tip:'SIGN IN'
  });
  const [signCount,setSignCount]=  useState(0);
  const emailName = props.data.useremail;
  useEffect(() => {
    if(!emailName){
      setDay(() => {
        return modifyDays([])
      })
    }else{
      fetchFunSinglist(emailName).then(res => {
        if(res.data.is_continue){
          setDay(() => {
            return modifyDays(res.data.is_continue)
          })
          setSignCount(res.data.is_continue.length)
        }else{
          setDay(() => {
            return modifyDays([])
          })
          setSignCount(0)
        }
      })
    }

  }, [])
  const submit = () => {
    const  email  =  {
      email:emailName
    }
    if(!emailName){
      window.location.href  = 'https://www.thesupermade.com/account/login?return_url=/pages/s2o-tickets';
    }else{
      fetchFunSingadd(email).then(res => {
        if(res.data ==1){
          fetchFunSinglist(emailName).then(res => {
            setDay(() => {
              return modifyDays(res.data.is_continue)
            })
            setSignCount(res.data.is_continue.length)
          })
        }else{
          setSignStatus(()=>{
            return({
              type:'isSignStyle',
              tip:'ALREADY SIGN IN'
            })
          })
        }
  
      })
    }
  }
  const modifyDays = (orgData = []) => {
    const newDays = [];
    for (let i = 0; i < 7; i++) {
      if (orgData[i] == i) {
        newDays.push({ day: i + 1, active: true });
      } else {
        newDays.push({ day: i + 1, active: false })
      }
    }
    return newDays
  }
  return (
    <div id='root-app'>
      <div className='top-bg'>
        <div className='bg-img'>
          <img className='isMobile' width="100%" src='https://sources.aopcdn.com/edm/images/kokorou/20230220/1676858174938.jpg'></img>
          <img className='isPc' width="100%" src='http://sources.aopcdn.com/edm/images/kokorou/20230220/1676858269371.jpg'></img>
        </div>
        <div className='content-warp'>
          <div className='xxxx'>
            <div className='page-content-top'>
              <div className="top-title">SIGN IN TO WIN</div>
              <div className="top-title_big">THE S2O TICKETS</div>
              <div className='top-title_b'>[100% PRIZE!]</div>
              <div className="top-form-box">
                <div className="title-img">
                  <img width='100%' src="http://sources.aopcdn.com/edm/images/kokorou/20230217/1676619688258.png"></img>

                  <div className="img-bank">
                    <div className="nnn"></div>
                  </div>
                </div>
                <div className="form-box">
                  <div className="form-input-box">
                    <button disabled ={signStatus.type?true:false}  className ={`submit ${signStatus.type}`} onClick={submit}>{signStatus.tip}</button>
                  </div>
                  <div className='email-info-box'>
                        {emailName}
                  </div>
                  <div className='day-list-warp'>
                    <div className="day-list-box">

                      {
                        days.map((item, key) => {

                          let active = item.active ? 'day-text acitve' : 'day-text'
                          return (
                            <div key={key} className="day-box">
                              <div className={active}>DAY {item.day}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='sign-days'>
                    You have successfully signed in for <span className='singNum'>{signCount} </span> days
                    </div>
                  </div>
                </div>
              </div>
              <div className="top-ticket">
                <div className='ticket-title'>
                  ACTIVITY REWARDS
                </div>
                <div className='list-warp'>
                  <div className='ticket-list'>
                    <div className='ticket-item'>
                      <div className='ticket-img-box'>
                        <img src='http://sources.aopcdn.com/edm/images/kokorou/20230218/1676699323922.png'></img>
                      </div>
                      <div className='ticket-info'>
                        S2O Music Festival E-Ticket 1DAY PASS *5
                      </div>
                    </div>
                    <div className='ticket-item'>
                      <div className='ticket-img-box'>
                        <img src='http://sources.aopcdn.com/edm/images/kokorou/20230220/1676874922490.png'></img>
                      </div>
                      <div className='ticket-info'>
                        SuperMade Custom Necklace *1000
                      </div>
                    </div>
                    <div className='ticket-item'>
                      <div className='ticket-img-box'>
                        <img src='http://sources.aopcdn.com/edm/images/kokorou/20230220/1676874941679.png'></img>
                      </div>
                      <div className='ticket-info'>
                        SuperMade Discount Coupon *5000
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='page-content-middle'>
        <div className='bg-img'>
          <img className='isMobile' width="100%" src='https://sources.aopcdn.com/edm/images/bellalike-spain/20230220/1676877123226.png'></img>
          <img className='isPc' width="100%" src='http://sources.aopcdn.com/edm/images/cicilookshop/20230220/1676876751725.png'></img>
        </div>
        <div className='middle-content'>
          <div className='xxxx'>
            <div className='page-content-md'>
                      <div className='md-top'>
                          <div className='md-top-title'>ACTIVITY RULES</div>
                          <div className='md-top-p'>
                              <p>1. Activity time: 2023-02-20 00:00 - 2023-03-15 23:59.</p>
                              <p>2. Login the mailbox is required to sign in. </p>
                              <p>3. You can participate in the lucky draw if you have signed in for 7 days, and the record of interrupted sign-in will be cleared and counted from the first day. </p>
                              <p>4. The overall winning rate of the activity is 100% .</p>
                              <p>5. The winner will be announced within one week after the prize is opened. The S2O Music Festival e-ticket and SuperMade discount coupon will be sent via email. the SuperMade custom necklace will be delivered via international logistics.</p>
                          </div>
                      </div>
                      <hr></hr>
                      <div className='md-bottom'>
                      <div className='md-bottom-title'>CAUTION</div>
                      <div className='md-bottom-p'>
                          <div className='b-p-info'>
                          In the event of force majeure (including but not limited to major disasters, a
                            ctivities directed by government agencies that need to stop or adjust, activities with extensive cheating, activities subject to serious network attacks or system failure resulting in a large number of errors on the winning list, activities can not be carried out normally), the merchant has the right to cancel, modify or suspend this activity.
                          </div>
                      </div>
                  </div>
            </div>
          </div>
        </div>

      </div>
      <div className='box-img-md'>
        <img width="100%" src="http://sources.aopcdn.com/edm/images/kokorou/20230217/1676618444767.png"></img>
      </div>
      <div className='page-content-bottom'>
        <div className='bottom'>
          <div className='b-img-warp'>
            <div className='b-img-box'>
              <img width="100%" src='http://sources.aopcdn.com/edm/images/fashionme/20230220/1676877698237.png'></img>
            </div>
          </div>

          <div className='bottom-info'>
            IT’S HOT, IT’S WET, IT’S WILD! DRESS FOR BATTLE AND GET SOAKED IN THWATER-
            SPLASHINGNG MADNESS OF THE ANNUAL S2O SONGKRAN MUSIC FESTIVAL.
            TAKING PLACE IN BANGKOK, TAIW,AN AND TOKYO, S2O IS THE WORLD’S BIGGEST
            SONGKRAN CELEBRATION, FILLING THE SUMMER’S HOTTEST NIGHTS WITH BLASTS OF
            COOL WATER, PULSATING BEATS FROM THE WORLD’S TOP DJS AND ONE OF ASIA’S
            MOST AWESOME AND BIGGEST PRODUCTIONS.<br />
            ARE YOU READY FOR THE WORLD’S WETTEST PARTY? BETTER BE BECAUSE YOUR BODY
            NEEDS LOTS OF WATER!
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
