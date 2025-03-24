'use client';

import React from 'react';

// Define the ContactItem interface
export interface ContactItem {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string | null;
}

// ContactCardContent component
export default function ContactCardContent({ item }: { item: ContactItem }) {
  return (
    <>
      <div className="flex items-center mb-3">
        <div className="text-primary mr-4">
          {item.icon}
        </div>
        <h3 className="font-medium">{item.title}</h3>
      </div>
      <p className="text-muted-foreground">{item.value}</p>
      {item.link && (
        <a 
          href={item.link} 
          target={item.title !== 'Email' ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="mt-2 text-sm text-primary hover:underline transition-all inline-block"
        >
          {item.title === 'Email' ? 'Write me →' : 'Visit →'}
        </a>
      )}
    </>
  );
}