

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'description',
      title: 'Smart Summarization',
      description: 'Get concise summaries of long documents in seconds.'
    },
    {
      icon: 'forum',
      title: 'Q&A Chat',
      description: 'Ask questions and get instant answers from your documents.'
    },
    {
      icon: 'checklist',
      title: 'Key Points Extraction',
      description: 'Automatically identify and extract key information.'
    },
    {
      icon: 'compare_arrows',
      title: 'Document Comparison',
      description: 'Compare two documents side-by-side to spot differences.'
    },
    {
      icon: 'search',
      title: 'Smart Search',
      description: 'Find what you\'re looking for with our intelligent search.'
    },
    {
      icon: 'label',
      title: 'Auto-Tagging',
      description: 'Organize your documents with automatic tagging.'
    }
  ];

  return (
    <section className="py-20 light:bg-gray-100 bg-gray-900/50" id="features">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex flex-col gap-12">
          <div className="text-center">
            <h2 className="light:text-gray-900 text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">
              Core AI Features
            </h2>
            <p className="light:text-gray-600 text-gray-400 mt-4 text-lg max-w-3xl mx-auto">
              Explore the powerful AI capabilities that make IntelliDoc the smartest way to manage your documents.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ 
  icon, 
  title, 
  description 
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border light:border-gray-200 border-gray-800  light:bg-background-light bg-background-dark p-6 text-center items-center">
      <div className="text-primary text-4xl">
       <span className="material-symbols-outlined text-4xl!">{icon}</span>
      </div>
      <h3 className="light:text-gray-900 text-white text-xl font-bold leading-tight">{title}</h3>
      <p className="light:text-gray-500 text-gray-400 text-base font-normal leading-normal">{description}</p>
    </div>
  );
};
export default FeaturesSection