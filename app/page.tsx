import { getProjects } from '@/lib/notion';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Header from '@/components/Header';

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              Projects
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              제가 작업한 프로젝트들입니다. 각 프로젝트는 문제 해결과 창의적인 접근을 통해 완성되었습니다.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              About Me
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                저는 사용자 중심의 웹 애플리케이션을 개발하는 것을 좋아하는 개발자입니다. 
                새로운 기술을 배우고 적용하는 것에 열정을 가지고 있으며, 
                팀과 함께 성장하는 것을 중요하게 생각합니다.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                 주로  프론트엔드 개발은 React, Next.js, TypeScript를 사용하며 
                 백엔드 개발은 Java,nodejs 를 사용하였습니다.
                 현재는 개발 인프라에 대한 내용(docker,k8s,aws)과 ai 활용에 대해 준비중입니다.
               
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {['React', 'Next.js', 'JavaScript', 'Node.js', 'Java', 'Tailwind CSS', 'my-sql', 'ms-sql'].map((skill) => (
                  <div key={skill} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Get In Touch
            </h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                새로운 기회와 도전을 항상 환영합니다. 
                프로젝트 협업이나 궁금한 점이 있으시다면 언제든지 연락주세요!
              </p>
              <a
                href="https://open.kakao.com/o/sVPU60Qf"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-2xl font-medium hover:bg-[#F7DD00] hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.12 2 10c0 2.25 1.5 4.25 3.84 5.52-.16.68-.8 3.36-.82 3.56-.03.3.22.3.3.24.09-.06 3.81-2.52 4.36-2.88.75.12 1.53.18 2.32.18 5.52 0 10-3.12 10-7 0-3.88-4.48-7-10-7z"/>
                </svg>
                카카오톡 오픈채팅
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
