import React from "react";

const MessagesSkeleton = () => {
  const skeletonMessages = Array(5).fill(null);
  return (
    <>
      <div className="messages w-full h-full overflow-auto flex justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="skeleton w-4 h-4 rounded-full bg-zinc-900 animate-bounce"></div>
          <div className="skeleton w-4 h-4 rounded-full bg-zinc-900 animate-bounce [animation-delay:-.3s]"></div>
          <div className="skeleton w-4 h-4 rounded-full bg-zinc-900 animate-bounce [animation-delay:-.5s]"></div>
        </div>
  
      </div>
    </>
  );
};

export default MessagesSkeleton;
