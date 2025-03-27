import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const WebsitesList = () => {
  const router = useRouter();

  const [websites, setWebsites] = useState([
    {
      id: '1',
      name: 'testing',
      description: 'teter',
      domain: 'tterst.tsafi.xyz',
      createdAt: '3/26/2025'
    }
  ]);

  const createWebsite = async () => {
    try {
      const response = await fetch('/api/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any required body data
        // body: JSON.stringify(data)
      });



      if (response.ok) {
        const newWebsite = await response.json();
        setWebsites([...websites, newWebsite]);
      } else {
        console.error('Failed to create website');
      }
    } catch (error) {
      console.error('Error creating website:', error);
    }
  };

  const handleWebsiteClick = (websiteId) => {
    router.push(`/user/website/${websiteId}/get`);
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6 w-full">
      <div className="flex justify-end mb-6">
        <button 
          onClick={createWebsite}
          className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Create
        </button>
      </div>
      <div className="space-y-4">
        {websites.map((website) => (
          <div 
            key={website.id}
            onClick={() => handleWebsiteClick(website.id)}
            className="bg-[#1A1A1A] rounded-lg p-4 cursor-pointer hover:bg-[#2A2A2A] transition-colors"
          >
            <h2 className="text-white font-semibold text-lg">{website.name}</h2>
            <p className="text-gray-400 text-sm">{website.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-500 text-sm">{website.domain}</span>
              <span className="text-gray-500 text-sm">{website.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsitesList;