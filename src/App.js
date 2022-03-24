import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {  
  useEffect(()=>{
    axios.post(`https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token`,   
      {headers: {
        'Content-Type': 'application/vnd.ni-identity.v1+json',
        'Authorization':'Basic N2M5MzFkMDEtMDk0Ni00NTMxLWI5NWYtZWU4MDU4OTc4MzdhOjhjZGRhNThjLTQ2YzgtNDZkMy1hOGZmLTY0ZDM3NmVhNmU4Mg=='
      }}
    )
    .then(res => {debugger;
      const accessToken = res.data.access_token;
      localStorage.setItem('accesstoken',accessToken);
      createOrder(accessToken);
      
    })

  },[]) 

  const createOrder=()=>{
    axios.post(`https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/5288a11b-7560-428c-91b3-d03798ded7d0/orders`,  
    {
      "_id": "urn:order:9662e6bd-729d-4ec9-b56b-391df748106c",
      "_links": {
        "self": {
          "href": "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/5edab6d7-5946-43f4-b8c7-06b29c272bdd/orders/9662e6bd-729d-4ec9-b56b-391df748106c"
        },
        "tenant-brand": {
          "href": "http://config-service/config/outlets/5edab6d7-5946-43f4-b8c7-06b29c272bdd/configs/tenant-brand"
        },
        "merchant-brand": {
          "href": "http://config-service/config/outlets/5edab6d7-5946-43f4-b8c7-06b29c272bdd/configs/merchant-brand"
        }
      },
      "action": "SALE",
      "amount": {
        "currencyCode": "AED",
        "value": 100
      },
      "language": "en",
      "merchantAttributes": {
        "redirectUrl": "https://yoursite.com/redirect"
      },
      "emailAddress": "test@customer.com",
      "reference": "9662e6bd-729d-4ec9-b56b-391df748106c",
      "outletId": "5edab6d7-5946-43f4-b8c7-06b29c272bdd",
      "createDateTime": "2019-04-17T11:53:21.195Z",
      "paymentMethods": {
        "card": [
          "DINERS_CLUB_INTERNATIONAL",
          "AMERICAN_EXPRESS",
          "MASTERCARD",
          "MASTERCARD",
          "VISA",
          "VISA"
        ],
        "wallet": [
          "SAMSUNG_PAY",
          "APPLE_PAY"
        ]
      },
      "referrer": "urn:Ecom:9662e6bd-729d-4ec9-b56b-391df748106c",
      "formattedAmount": ".1",
      "formattedOrderSummary": {},
      "_embedded": {
        "payment": [
          {
            "_id": "urn:payment:b63725f7-8205-42b8-829f-268c91922b28",
            "_links": {
              "cnp:capture": {
                "href": "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/5edab6d7-5946-43f4-b8c7-06b29c272bdd/orders/9662e6bd-729d-4ec9-b56b-391df748106c/payments/b63725f7-8205-42b8-829f-268c91922b28/captures"
              },
              "self": {
                "href": "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/5edab6d7-5946-43f4-b8c7-06b29c272bdd/orders/9662e6bd-729d-4ec9-b56b-391df748106c/payments/b63725f7-8205-42b8-829f-268c91922b28"
              },
              "cnp:cancel": {
                "href": "https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/5edab6d7-5946-43f4-b8c7-06b29c272bdd/orders/9662e6bd-729d-4ec9-b56b-391df748106c/payments/b63725f7-8205-42b8-829f-268c91922b28/cancel"
              },
              "curies": [
                {
                  "name": "cnp",
                  "href": "https://api-gateway.sandbox.ngenius-payments.com/docs/rels/{rel}",
                  "templated": true
                }
              ]
            },
            "paymentMethod": {
              "expiry": "2025-04",
              "cardholderName": "Test Customer",
              "name": "VISA",
              "pan": "401200******1112"
            },
            "savedCard": {
              "maskedPan": "401200******1112",
              "expiry": "2025-04",
              "cardholderName": "Test Customer",
              "scheme": "VISA",
              "cardToken": "dG9rZW5pemVkUGFuLy92MS8vU0hPV19OT05FLy9yYnJjdjRkaGV6YmEzaXZv"
            },
            "state": "AUTHORISED",
            "amount": {
              "currencyCode": "AED",
              "value": 100
            },
            "updateDateTime": "2019-04-17T11:55:12.336Z",
            "outletId": "5edab6d7-5946-43f4-b8c7-06b29c272bdd",
            "orderReference": "9662e6bd-729d-4ec9-b56b-391df748106c",
            "authResponse": {
              "authorizationCode": "139537",
              "success": true,
              "resultCode": "00",
              "resultMessage": "Successful approval/completion or that VIP PIN verification is valid",
              "rrn": "01234567890"
            },
            "3ds": {
              "status": "SUCCESS"
            }
          }
        ]
      }
    }, 
    {headers: {
      'Content-Type': 'application/vnd.ni-payment.v2+json',
      'Accept':'application/vnd.ni-payment.v2+json',
      'Authorization':`Bearer ${localStorage.getItem('accesstoken')}`
    }}
  )
  .then(res => {debugger;
    const accessToken = res.data.access_token;
    localStorage.setItem('accesstoken',accessToken)
    
  })

  }
const verifyOrder=()=>{
  axios.get(`https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/5288a11b-7560-428c-91b3-d03798ded7d0/orders/[order-reference]`,   
  {headers: {
    'Authorization':`Bearer ${localStorage.getItem('accesstoken')}`
  }}
)

}

const handleClickPay=()=>{
  window.location.replace("https://en.wikipedia.org/wiki/Main_Page");
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={handleClickPay}>Click to pay</button>
    </div>
  );
}

export default App;
