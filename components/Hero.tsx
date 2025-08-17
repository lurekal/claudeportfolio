'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">

       {/* 왼쪽: 이미지 */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 relative"
        >
          <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/hero-image.jpg"
              alt="가족과 함께"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
        {/* 오른쪽: 텍스트 콘텐츠 */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              안녕하세요
            </span>
            <br />
            <span className="text-gray-800 dark:text-white text-3xl md:text-5xl">
              저는 개발자 임희준 입니다
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
          >
            이 포트폴리오는 claude code 를 이용한 vibe 코딩을 통해 제작하였습니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              프로젝트 보기
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-full font-medium hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-300"
            >
              연락하기
            </a>
          </motion.div>
        </div>

    
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-gray-400 dark:text-gray-600" size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}