'use client';

import React from 'react';
import Image from 'next/image';
import { DeveloperInfo } from './data';

/**
 * DeveloperCard component props
 */
export interface DeveloperCardProps {
    developerInfo: DeveloperInfo;
    profileImage?: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
    profileImage = '/profile-image-0.jpg' // Default path, update as needed
}) => {
    return (
        <div className="relative h-72 w-72 mx-auto">
          {/* Decorative colored box in the background */}
          <div className="absolute top-6 right-6 h-full w-full bg-card-hover rounded-lg border border-border z-0"></div>
          
          {/* Profile Photo Container - on top of decorative box */}
          <div className="absolute inset-0 rounded-lg border-2 border-border overflow-hidden z-10 shadow-md">
            <Image 
              src={profileImage} 
              alt="Profile photo"
              width={288}
              height={288}
              className="object-cover w-full h-full"
              priority
              quality={95}
            />
          </div>
        </div>
      );
};

export default DeveloperCard;