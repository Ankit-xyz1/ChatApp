import { THEMES } from "../lib/themeArray";
import { themeStore } from "../store/themeStore";
import {Send} from 'lucide-react';

const Setting = () => {
  const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! Ankit , whats up?", isSent: false },
    { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
  ]
  const { theme, setTheme } = themeStore();
  return (
    <>
      <div className="main w-full h-screen">
        <div className="themes w-full h-[50] p-10 flex justify-center items-center mt-10 flex-col gap-3">
          <h2 className="jet text-xl">Select your theme</h2>
          <div className="themes p-5 w-[80%] h-full grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-5">
            {THEMES.map((item) => {
              return (
                <>
                  <button
                    key={item}
                    className={`overflow-hidden cursor-pointer ${
                      theme == item ? "hover:cursor-not-allowed bg-base-200" : null
                    } `}
                    onClick={() => setTheme(item)}
                  >
                    <div
                      className=" relative h-14 jet w-full rounded-md overflow-hidden"
                      data-theme={item}
                    >
                      <div className="themess flex flex-row w-full h-8">
                        <div className="bg-primary w-[25%]"></div>
                        <div className="bg-secondary w-[25%]"></div>
                        <div className="bg-accent w-[25%]"></div>
                        <div className="bg-neutral w-[25%]"></div>
                      </div>
                      {item}
                    </div>
                  </button>
                </>
              );
            })}
            
          </div>
        </div>
        <div className="chatTest p-5 mt-4 w-full h-[30vh] ">
        <h3 className="text-xl font-semibold mb-3 text-center">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Vivek Ribadiya</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
