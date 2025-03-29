interface Props {
  days: number;
  price: number;
  description: string;
}

export const JobListingDurationPricing: Props[] = [
  {
    days: 7,
    price: 0,
    description: "Free Trial",
  },
  {
    days: 30,
    price: 99,
    description: "Standard Listing",
  },
  {
    days: 60,
    price: 190,
    description: "Premium Listing",
  },
  {
    days: 90,
    price: 270,
    description: "Exclusive Listing",
  },
];
