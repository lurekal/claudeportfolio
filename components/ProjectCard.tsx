'use client';

import { motion } from 'framer-motion';
import { User, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/notion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const formatDate = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const formatMonth = (date: Date) => {
      return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short' });
    };
    
    if (end) {
      return `${formatMonth(start)} - ${formatMonth(end)}`;
    }
    return formatMonth(start);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/projects/${project.id}`}>
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {project.title.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Calendar size={12} />
          <span>{formatDate(project.startDate, project.endDate)}</span>
        </div>
        
        {project.role && (
          <div className="flex items-center gap-2 mb-2">
            <User size={14} className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {project.role}
            </span>
          </div>
        )}
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
}