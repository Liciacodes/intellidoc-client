const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: '"IntelliDoc has revolutionized how we handle legal documents. The smart search is a lifesaver!"',
      name: 'Sarah L.',
      role: 'Legal Analyst',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-1gWwuC_Uz_H5XvB1fq9VyTzDlvxgojT_LvMiY_Qhc6AU070zNBTXcF076Y6XTq-sd7kU7IrDX7LyI3yMMcSIWZ_IvZYdt3pNF4I6_c_z5XZZ12mgF-I9zbqGhBvRh7AGeP2mI2vm5qcPPrP1Fn_kIThzJM086aYqZqGUHRI1j8EurQ9saQNiuE3Z_0ENsD_qGUYBnXvOujArmWKohIt-PGMU1qwZQxlKuNLOAGtnqXYncpwTqt2bEoT8xOBDZ0FDAiYskKHx7Bwz'
    },
    {
      text: '"The summarization feature saves me hours of reading every week. I can\'t imagine my workflow without it."',
      name: 'Michael B.',
      role: 'Researcher',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrDU6RdzhdW2819AkCNcpeeSvGTLJW3JvGjRnp9sXuhUJ1rBlRkWMWfUzTeqkQHIsVUWJCLpmBnF8OqOv5KlW3mXE9VfL8EKmrU1OPbSKj-GjhEHjm4ZzXdvSnYdzLawB9CSIuVklre5XKpr9frVfldx1YrsNYafsyjfCoDD1lfmPhuASBzNmF7tu5K7e1QCcSbYh9GKQ3EXiVGeIbMoWv61Vvi7UYn-EXPluB4P5zb5acnnoICElg8HccPV8jyJkuaEIyLye09L4w'
    },
    {
      text: '"As a student, IntelliDoc helps me quickly grasp the key points of dense academic papers. It\'s an incredible tool."',
      name: 'Emily C.',
      role: 'PhD Student',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIlUd7yf9bysyzWpruMKHPKFSs6V9NpLA4EF93SUr_OHHIwfxmWivuMpKNcepUSxj0QOR7R2Vtw05yhtYoJpdX40XMfbCARcISmdtkH6RVwPIF0a9zVo_E8oPrvQk3v4DYnigGS6142xOt1e3xbKJndlyyB8gjHpq4gNX-MTzeqWJFmZnLjNLEa_ueou1uJalChQG0rWz3kyewngoa3rUvVGpQ5TG6oGAwXDBOcpJ_cBbvrNlws9BefqBvBev6npt_PrVj5sm0vBeF'
    }
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900/50" id="testimonials">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="text-center">
          <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">
            What Our Users Say
          </h2>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ text: string; name: string; role: string; avatar: string }> = ({
  text,
  name,
  role,
  avatar
}) => {
  return (
    <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md">
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
      <div className="mt-4 flex items-center">
        <img alt="User avatar" className="w-12 h-12 rounded-full mr-4" src={avatar} />
        <div>
          <p className="text-gray-900 dark:text-white font-semibold">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection