import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  imageUrl?: string;
  startDate: string;
  endDate?: string;
}

export async function getProjects(): Promise<Project[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    throw new Error('Missing NOTION_DATABASE_ID environment variable');
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
      ],
    });

    const projects: Project[] = response.results.map((page) => {
      const fullPage = page as PageObjectResponse;
      const properties = fullPage.properties;
      
      // 커버 이미지 우선, 없으면 Image 속성 사용
      let imageUrl = undefined;
      if (fullPage.cover) {
        if (fullPage.cover.type === 'external') {
          imageUrl = fullPage.cover.external.url;
        } else if (fullPage.cover.type === 'file') {
          imageUrl = fullPage.cover.file.url;
        }
      }
      
      // 커버가 없으면 Image 속성에서 가져오기
      if (!imageUrl && 'Image' in properties) {
        const imageProperty = properties.Image;
        if (imageProperty.type === 'files' && imageProperty.files.length > 0) {
          const firstFile = imageProperty.files[0];
          if (firstFile.type === 'file') {
            imageUrl = firstFile.file.url;
          } else if (firstFile.type === 'external') {
            imageUrl = firstFile.external.url;
          }
        }
      }
      
      const nameProperty = properties.Name;
      const descriptionProperty = properties.Description;
      const roleProperty = properties.Role;
      const technologiesProperty = properties.Technologies;
      const dateProperty = properties.Date;
      
      return {
        id: fullPage.id,
        title: nameProperty?.type === 'title' ? nameProperty.title[0]?.plain_text || '' : '',
        description: descriptionProperty?.type === 'rich_text' ? descriptionProperty.rich_text[0]?.plain_text || '' : '',
        role: roleProperty?.type === 'rich_text' ? roleProperty.rich_text[0]?.plain_text || '' : '',
        technologies: technologiesProperty?.type === 'multi_select' 
          ? technologiesProperty.multi_select.map((tech: { name: string }) => tech.name) 
          : [],
        imageUrl: imageUrl,
        startDate: dateProperty?.type === 'date' ? dateProperty.date?.start || new Date().toISOString() : new Date().toISOString(),
        endDate: dateProperty?.type === 'date' ? dateProperty.date?.end || undefined : undefined,
      };
    });

    return projects;
  } catch (error) {
    console.error('Error fetching projects from Notion:', error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const fullPage = page as PageObjectResponse;
    const properties = fullPage.properties;
    
    // 커버 이미지 우선, 없으면 Image 속성 사용
    let imageUrl = undefined;
    if (fullPage.cover) {
      if (fullPage.cover.type === 'external') {
        imageUrl = fullPage.cover.external.url;
      } else if (fullPage.cover.type === 'file') {
        imageUrl = fullPage.cover.file.url;
      }
    }
    
    // 커버가 없으면 Image 속성에서 가져오기
    if (!imageUrl && 'Image' in properties) {
      const imageProperty = properties.Image;
      if (imageProperty.type === 'files' && imageProperty.files.length > 0) {
        const firstFile = imageProperty.files[0];
        if (firstFile.type === 'file') {
          imageUrl = firstFile.file.url;
        } else if (firstFile.type === 'external') {
          imageUrl = firstFile.external.url;
        }
      }
    }
    
    const nameProperty = properties.Name;
    const descriptionProperty = properties.Description;
    const roleProperty = properties.Role;
    const technologiesProperty = properties.Technologies;
    const dateProperty = properties.Date;
    
    return {
      id: fullPage.id,
      title: nameProperty?.type === 'title' ? nameProperty.title[0]?.plain_text || '' : '',
      description: descriptionProperty?.type === 'rich_text' ? descriptionProperty.rich_text[0]?.plain_text || '' : '',
      role: roleProperty?.type === 'rich_text' ? roleProperty.rich_text[0]?.plain_text || '' : '',
      technologies: technologiesProperty?.type === 'multi_select' 
        ? technologiesProperty.multi_select.map((tech: { name: string }) => tech.name) 
        : [],
      imageUrl: imageUrl,
      startDate: dateProperty?.type === 'date' ? dateProperty.date?.start || new Date().toISOString() : new Date().toISOString(),
      endDate: dateProperty?.type === 'date' ? dateProperty.date?.end || undefined : undefined,
    };
  } catch (error) {
    console.error('Error fetching project from Notion:', error);
    return null;
  }
}