const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'For individuals getting started.',
      features: ['5 documents/month', 'Basic summarization', 'Standard Q&A'],
      popular: false,
      buttonText: 'Choose Plan'
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'For professionals and teams.',
      features: ['Unlimited documents', 'Advanced AI features', 'Document comparison', 'Priority support'],
      popular: true,
      buttonText: 'Choose Plan'
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      description: 'For large organizations.',
      features: ['Custom integrations', 'On-premise deployment', 'Dedicated support'],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="text-center">
          <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">
            Find the Right Plan for You
          </h2>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard: React.FC<{
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}> = ({ name, price, description, features, popular, buttonText }) => {
  const isEnterprise = name === 'Enterprise';
  
  return (
    <div className={`border rounded-xl p-8 flex flex-col relative ${
      popular 
        ? 'border-2 border-primary' 
        : 'border-gray-200 dark:border-gray-800'
    }`}>
      {popular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className={`text-xl font-semibold ${
        popular ? 'text-primary' : 'text-gray-900 dark:text-white'
      }`}>
        {name}
      </h3>
      
      <p className="text-4xl font-bold text-gray-900 dark:text-white mt-4">
        {price}
        {!isEnterprise && <span className="text-lg font-medium text-gray-500 dark:text-gray-400">/mo</span>}
      </p>
      
      <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
      
      <ul className="mt-6 space-y-4 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
<span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`mt-8 w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
        popular 
          ? 'bg-primary text-white hover:bg-primary/90' 
          : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
      }`}>
        {buttonText}
      </button>
    </div>
  );
};
export default PricingSection