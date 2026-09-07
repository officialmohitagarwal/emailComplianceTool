import { useState } from "react";

const EmailPreview = ({
  content,
  fromName,
  fromEmail,
  subject,
}) => {
  const [device, setDevice] = useState("desktop");

  const senderInitial = fromName
    ? fromName.charAt(0).toUpperCase()
    : "S";

  return (
    <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">

      {/* =========================
          HEADER
      ========================== */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h3 className="text-lg font-bold text-[#17181a]">
            Email Preview
          </h3>

          <p className="mt-1 text-sm text-[#737780]">
            Preview your email on desktop and mobile.
          </p>
        </div>

        {/* Device Toggle */}

        <div className="flex shrink-0 rounded-lg border border-[#dfe2e7] bg-[#f7f8fa] p-1">

          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`rounded-md px-4 py-2 text-xs font-medium transition ${
              device === "desktop"
                ? "bg-white text-[#17181a] shadow-sm"
                : "text-[#737780] hover:text-[#30343a]"
            }`}
          >
            Desktop
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`rounded-md px-4 py-2 text-xs font-medium transition ${
              device === "mobile"
                ? "bg-white text-[#17181a] shadow-sm"
                : "text-[#737780] hover:text-[#30343a]"
            }`}
          >
            Mobile
          </button>

        </div>
      </div>


      
          {/* DESKTOP PREVIEW */}
      

      {device === "desktop" && (

        <div className="overflow-hidden rounded-xl border border-[#d9dadd] bg-[#eeeeF0] shadow-[0_10px_35px_rgba(0,0,0,0.07)]">

          {/* Desktop top bar */}

          <div className="relative flex h-11 items-center border-b border-[#d8d8db] bg-[#f7f7f8] px-4">

            {/* Navigation circles */}

            <div className="flex items-center gap-2">

              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />

              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />

              <span className="h-3 w-3 rounded-full bg-[#28c840]" />

            </div>

            {/* Center title */}

            <span className="absolute left-1/2 -translate-x-1/2 text-[11px] font-medium text-[#7b7d83]">
              Email Preview
            </span>

          </div>


          {/* Email metadata */}

          <div className="border-b border-[#e5e7eb] bg-white px-5 py-4">

            <div className="flex gap-3">

              {/* Avatar */}

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e9eaed] text-sm font-semibold text-[#555a62]">
                {senderInitial}
              </div>


              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <p className="text-sm font-semibold text-[#202124]">
                    {fromName || "Sender"}
                  </p>

                  <p className="truncate text-xs text-[#737780]">
                    &lt;
                    {fromEmail ||
                      "sender@example.com"}
                    &gt;
                  </p>

                </div>

                <p className="mt-1 text-sm font-semibold text-[#202124]">
                  {subject || "Email subject"}
                </p>

              </div>


              <span className="hidden shrink-0 text-xs text-[#999ca3] sm:block">
                Today
              </span>

            </div>

          </div>


          {/* Actual email */}

          <div className="bg-[#f1f2f4] p-4 sm:p-6">

            <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-lg bg-white shadow-sm">

              <iframe
                title="Desktop email preview"
                srcDoc={content}
                sandbox=""
                className="block h-[600px] w-full border-0"
              />

            </div>

          </div>

        </div>
      )}


      
          {/* MOBILE / IPHONE PREVIEW */}
      

      {device === "mobile" && (

        <div className="flex min-h-[760px] items-center justify-center overflow-hidden rounded-xl border border-[#dfe2e7] bg-[#eef0f3] p-5 sm:p-10">

          {/* Phone wrapper */}

          <div className="relative w-[375px] max-w-full">

            
                {/* SIDE BUTTONS */}
            

            {/* Power button */}

            <div className="absolute -right-[4px] top-[155px] h-[62px] w-[4px] rounded-r-full bg-[#202124]" />

            {/* Volume up */}

            <div className="absolute -left-[4px] top-[145px] h-[34px] w-[4px] rounded-l-full bg-[#202124]" />

            {/* Volume down */}

            <div className="absolute -left-[4px] top-[190px] h-[48px] w-[4px] rounded-l-full bg-[#202124]" />

            {/* Silent switch */}

            <div className="absolute -left-[4px] top-[105px] h-[22px] w-[4px] rounded-l-full bg-[#202124]" />


            
                {/* PHONE OUTER BODY */}
            

            <div className="rounded-[48px] bg-[#17181a] p-[7px] shadow-[0_30px_70px_rgba(0,0,0,0.25)]">

              {/* Metallic inner border */}

              <div className="rounded-[42px] bg-[#303136] p-[2px]">

                {/* Screen */}

                <div className="relative overflow-hidden rounded-[40px] bg-white">


                  
                      {/* STATUS BAR */}
                  

                  <div className="relative flex h-[48px] items-center justify-between bg-white px-6">

                    {/* Time */}

                    <span className="text-[13px] font-semibold tracking-[-0.01em] text-[#17181a]">
                      9:41
                    </span>


                    {/* Dynamic Island */}

                    <div className="absolute left-1/2 top-[10px] flex h-[22px] w-[92px] -translate-x-1/2 items-center justify-center rounded-full bg-[#090a0b]">

                      <div className="mr-1 h-[5px] w-[5px] rounded-full bg-[#202124]" />

                    </div>


                    {/* Status icons */}

                    <div className="flex items-center gap-1.5 text-[#17181a]">

                      {/* Signal */}

                      <div className="flex items-end gap-[2px]">

                        <span className="h-[5px] w-[2px] rounded-full bg-[#17181a]" />
                        <span className="h-[7px] w-[2px] rounded-full bg-[#17181a]" />
                        <span className="h-[9px] w-[2px] rounded-full bg-[#17181a]" />
                        <span className="h-[11px] w-[2px] rounded-full bg-[#17181a]" />

                      </div>


                      {/* WiFi */}

                      {/* <span className="text-[10px]">
                        ◔
                      </span> */}


                      {/* Battery */}

                      <div className="flex h-[9px] w-[18px] items-center rounded-[2px] border border-[#17181a] p-[1px]">

                        <div className="h-full w-[75%] rounded-[1px] bg-[#17181a]" />

                      </div>

                    </div>

                  </div>


                  
                      {/* MAIL APP HEADER */}
                  

                  <div className="border-b border-[#e5e7eb] bg-white px-4 pb-3 pt-1">

                    <div className="flex items-center justify-between">

                      {/* Back */}

                      <button
                        type="button"
                        className="flex items-center gap-1 text-[15px] font-medium text-[#2878d4]"
                      >
                        <span className="text-[24px] leading-none">
                          ‹
                        </span>

                        <span>
                          Inbox
                        </span>
                      </button>


                      {/* Actions */}

                      <div className="flex items-center gap-4 text-[#2878d4]">

                        {/* <span className="text-[19px]">
                          ↩
                        </span>

                        <span className="text-[19px]">
                          ◉
                        </span> */}

                      </div>

                    </div>

                  </div>


                  
                      {/* EMAIL HEADER */}
                  

                  <div className="border-b border-[#e5e7eb] bg-white px-4 py-4">

                    {/* Subject */}

                    <h4 className="pr-2 text-[18px] font-bold leading-6 tracking-[-0.02em] text-[#202124]">
                      {subject || "Email subject"}
                    </h4>


                    {/* Sender row */}

                    <div className="mt-4 flex items-center gap-3">

                      {/* Avatar */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9eaed] text-sm font-bold text-[#555a62]">
                        {senderInitial}
                      </div>


                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-1">

                          <p className="truncate text-[13px] font-semibold text-[#202124]">
                            {fromName || "Sender"}
                          </p>

                          <span className="text-[12px] text-[#8a8f97]">
                            ›
                          </span>

                        </div>


                        <p className="truncate text-[12px] text-[#737780]">
                          {fromEmail ||
                            "sender@example.com"}
                        </p>

                      </div>


                      {/* Date */}

                      <div className="shrink-0 text-right">

                        <p className="text-[11px] text-[#8a8f97]">
                          Today
                        </p>

                        <span className="text-[16px] text-[#8a8f97]">
                          ›
                        </span>

                      </div>

                    </div>

                  </div>


                  
                      {/* EMAIL CONTENT */}
                  

                  <div className="bg-white">

                    <iframe
                      title="Mobile email preview"
                      srcDoc={content}
                      sandbox=""
                      className="block h-[535px] w-full border-0"
                    />

                  </div>


                 

                  
                      {/* HOME INDICATOR */}
                  

                  <div className="flex h-[25px] items-center justify-center bg-[#fafafa]">

                    <div className="h-[5px] w-[108px] rounded-full bg-[#17181a]" />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}



          {/* FOOTER */}


      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-[#8a8f97]">

        <span>
          Previewing:{" "}

          <strong className="font-medium text-[#60656d]">
            {device === "desktop"
              ? "Desktop"
              : "Mobile"}
          </strong>
        </span>


        <span>
          {device === "desktop"
            ? "Desktop · Full width"
            : "Mobile"}
        </span>

      </div>

    </section>
  );
};

export default EmailPreview;