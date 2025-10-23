
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: 'upload_file',
      title: '1. Upload',
      description: 'Simply upload your documents to our secure platform.'
    },
    {
      icon: 'model_training',
      title: '2. AI Analyzes',
      description: 'Our AI will analyze your documents in real-time.'
    },
    {
      icon: 'insights',
      title: '3. Get Insights',
      description: 'Get actionable insights and summaries in a clean interface.'
    }
  ];

  return (
    <section className="py-20" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="text-center">
          <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">
            How It Works
          </h2>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-4 rounded-xl p-6">
              <div className="text-primary">
                <span className="material-symbols-outlined text-6xl">{step.icon}</span>
              </div>
              <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>


  );
};

export default HowItWorksSection