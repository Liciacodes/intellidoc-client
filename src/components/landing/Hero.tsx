import Button from "../ui/Button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background-dark" id="hero">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex flex-col gap-6 text-center md:text-left md:w-1/2">
            <h1 className="light:text-gray-900 text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
              Unlock the Power of Your Documents with AI.
            </h1>
            <p className="light:text-gray-600 text-gray-300 text-lg md:text-xl font-normal leading-normal">
              IntelliDoc helps you to summarize, chat, and analyze your documents with the power of AI.
            </p>
            <Button variant="special" onClick={() => console.log('Get Started clicked')}>
              Get Started for Free
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <div 
              className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg shadow-2xl"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKaOXrMPmoPQEBcjoKQ7uj4-Ozpncaw-6eDm0rKCamDBsVWlVqxwkaeabKO01xZMORMaSz_94EwEs8GFeOyvB_j6KZCyv_RTtWZ08TtMdOVEH53U7GPEtRi_JSYR7A4LfSsecJNm2YHuZP50l4pum6aqm1FW3Z6rT9LlynKQfBTuqGhq7CXYoxlhpKk-_0c3d_e63bLddjQM7kaW9LSPWAPdPF_NHYqCm0iLU2md4DnhbL077IVmY61p8kat-Q0twWnd2Y2MmQ7oiT")`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;