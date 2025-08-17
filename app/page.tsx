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
                주로 React, Next.js, TypeScript를 사용하여 프론트엔드 개발을 하고 있으며,
                Node.js와 Python을 활용한 백엔드 개발 경험도 보유하고 있습니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Docker'].map((skill) => (
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
                href="mailto:your-email@example.com"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                이메일 보내기
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
