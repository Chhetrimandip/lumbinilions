// lib/editorjs-parser.tsx
import React from 'react';
import Image from 'next/image';

interface EditorJSBlock {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

interface EditorJSContent {
  time: number;
  blocks: EditorJSBlock[];
  version: string;
}

export const parseEditorJSContent = (content: string, truncate = false): JSX.Element[] => {
  try {
    const parsedContent: EditorJSContent = JSON.parse(content);
    
    return parsedContent.blocks.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          if (truncate && index > 1) return null; // Only show first paragraph in cards
          return (
            <p key={block.id} className="text-gray-300 my-4">
              {block.data.text}
            </p>
          );
          
        case 'header':
          if (truncate) return null; // Skip headers in truncated view
          return React.createElement(
            `h${block.data.level}`,
            { 
              key: block.id,
              className: `text-white font-['Bebas_Neue'] text-${4 - block.data.level + 1}xl my-4` 
            },
            block.data.text
          );
          
        case 'image':
          // Always show first image in cards, skip others if truncating
          if (truncate && index > 0) return null;
          return (
            <div key={block.id} className="my-6 relative">
              <Image 
                src={block.data.file.url.replace('blob:http://localhost:3000/', '/uploads/')}
                alt={block.data.caption || "Blog image"}
                width={800}
                height={400}
                className="rounded-lg object-cover w-full"
              />
              {block.data.caption && (
                <p className="text-gray-400 text-sm mt-2 italic">{block.data.caption}</p>
              )}
            </div>
          );
          
        case 'delimiter':
          if (truncate) return null;
          return <hr key={block.id} className="my-8 border-amber-500/30" />;
          
        case 'table':
          if (truncate) return null;
          return (
            <div key={block.id} className="my-6 overflow-x-auto">
              <table className="min-w-full bg-neutral-800 rounded-lg overflow-hidden">
                {block.data.withHeadings && (
                  <thead className="bg-neutral-700">
                    <tr>
                      {block.data.content[0].map((cell: string, i: number) => (
                        <th key={i} className="px-4 py-2 text-left text-amber-500">{cell}</th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {(block.data.withHeadings ? block.data.content.slice(1) : block.data.content).map((row: string[], i: number) => (
                    <tr key={i} className={i % 2 ? 'bg-neutral-800' : 'bg-neutral-700/50'}>
                      {row.map((cell: string, j: number) => (
                        <td key={j} className="px-4 py-2 border-t border-neutral-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          
        default:
          return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error('Error parsing EditorJS content:', error);
    return [<p key="error" className="text-red-500">Error rendering content</p>];
  }
};

// Helper function to extract first image from content
export const getFirstImageFromContent = (content: string): string | null => {
  try {
    const parsedContent: EditorJSContent = JSON.parse(content);
    const imageBlock = parsedContent.blocks.find(block => block.type === 'image');
    
    if (imageBlock?.data?.file?.url) {
      return imageBlock.data.file.url.replace('blob:http://localhost:3000/', '/uploads/');
    }
    
    return null;
  } catch {
    return null;
  }
};

// Helper function to extract short excerpt
export const getExcerptFromContent = (content: string, maxLength = 150): string => {
  try {
    const parsedContent: EditorJSContent = JSON.parse(content);
    const paragraphBlock = parsedContent.blocks.find(block => block.type === 'paragraph');
    
    if (paragraphBlock?.data?.text) {
      const text = paragraphBlock.data.text;
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    }
    
    return '';
  } catch {
    return '';
  }
};