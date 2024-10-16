import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-test-paywall',
  templateUrl: './test-paywall.component.html',
  styleUrl: './test-paywall.component.css'
})
export class TestPaywallComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.tenplusweekly()

   
  }

  twentyplusweekly(){
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AYLpTYnE2OxbtxgX28xMaOjXdK6ngvOm8WcjqP9d7X7FDswJUuY4rCUENu0pDqA93S6tLu9xW7fOChTW&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    document.body.appendChild(script);

    script.onload = () => {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data: any, actions: { subscription: { create: (arg0: { plan_id: string; }) => any; }; }) {
          return actions.subscription.create({
            plan_id: 'P-7E262720SK561453FM4G7YLQ'
          });
        },
        onApprove: function(data: { subscriptionID: any; }, actions: any) {
          alert(data.subscriptionID);
        }
      }).render('#paypal-button-container-P-7E262720SK561453FM4G7YLQ');
    };
  }
  tenplusweekly(){
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AYLpTYnE2OxbtxgX28xMaOjXdK6ngvOm8WcjqP9d7X7FDswJUuY4rCUENu0pDqA93S6tLu9xW7fOChTW&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    document.body.appendChild(script);

    script.onload = () => {
      paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data: any, actions: { subscription: { create: (arg0: { plan_id: string; }) => any; }; }) {
          return actions.subscription.create({
            plan_id: 'P-0GN592111Y592943EM4G772Y'
          });
        },
        onApprove: function(data: { subscriptionID: any; }, actions: any) {
          alert(data.subscriptionID);
        }
      }).render('#paypal-button-container-P-0GN592111Y592943EM4G772Y');
    };
  }
}