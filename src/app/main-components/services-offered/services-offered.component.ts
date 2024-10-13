import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-offered',
  templateUrl: './services-offered.component.html',
  styleUrl: './services-offered.component.css'
})
export class ServicesOfferedComponent {

  constructor(private router: Router){

  }

  services = [
    {
      name: "Basic Football Predictions",
      tier: "Free",
      features: [
        "Daily free predictions",
        "Popular league coverage",
        "Basic analysis and returns",
        "Limited small odds per day"
      ],
      price: 0
    },
    {
      name: "Pro Football Predictions",
      tier: "Paid Subscription",
      features: [
        "Advanced analysis and winning rate",
        "Access to all league predictions",
        "High Odds for Max wins",
        "High returns on investments",
        "Tailored prices as per your needs",
        "24/7 customer support"
      ],
      price: "check each category"
    },
    {
      name: "Custom VIP Predictions",
      tier: "Custom Subscription",
      features: [
        "all Pro products",
        "Personalized betting tips",
        "Expert predictions",
        "24/7 customer support",
        "Custom analysis and reports",
        "Chargebacks and Refunds policy"
      ],
      price: "Contact us"
    }
  ];

  onCardClick(service: any) {
    if (service.tier === 'Custom Subscription') {
     
     this.router.navigate(['contacts'])
    } else {
      console.log(`You clicked on the ${service.name} card.`);
    }
  }
}
