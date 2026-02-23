import { getProjectById, getProjects } from '@/lib/notion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';

export const revalidate = 1800;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);
  
  if (!project) {
    notFound();
  }

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const formatFullDate = (date: Date) => {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };
    
    if (end) {
      return `${formatFullDate(start)} - ${formatFullDate(end)}`;
    }
    return formatFullDate(start);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
            {project.imageUrl && (
              <div className="aspect-video relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                {project.title}
              </h1>

              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDateRange(project.startDate, project.endDate)}</span>
                </div>
                {project.role && (
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium text-purple-600 dark:text-purple-400">{project.role}</span>
                  </div>
                )}
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}