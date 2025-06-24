import React from "react";

interface ProfileCardProps {
  photo: string;
  name: string;
  role: string;
  description: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  photo,
  name,
  role,
  description,
  githubUrl,
  linkedinUrl,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-8 px-2 py-2">
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md flex-grow">
        <img
          src={photo}
          alt={`Foto de ${name}`}
          className="w-40 h-40 rounded-full object-cover mb-4 border-2 border-primary"
        />
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 mb-2 text-center font-semibold">{role}</p>
        <p
          className="text-sm text-gray-700 text-center max-w-xs py-2">
          { description }
        </p>
        <div className="flex gap-6 mt-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub de ${name}`}
            >
              <img src="/github.png" alt="GitHub" className="w-6 h-6" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${name}`}
            >
              <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
