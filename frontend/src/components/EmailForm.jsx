import JurisdictionSelector from "./JurisdictionSelector";

const EmailForm = ({
  form,
  loading,
  error,
  onChange,
  onSubmit,
}) => {

  const caslSelected =
    form.jurisdictions?.includes("CASL");


  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">

      {/* Subject */}
      <div className="mb-6">

        <label className="mb-2 block text-sm font-semibold text-[#30343a]">
          Subject
        </label>

        <input
          type="text"
          value={form.subject ?? ""}
          placeholder="e.g. Increase your sales"
          onChange={(e) =>
            onChange(
              "subject",
              e.target.value
            )
          }
          className="h-11 w-full rounded-lg border border-[#dfe2e7] px-3.5 text-sm outline-none transition focus:border-[#9da3ad] focus:ring-4 focus:ring-black/[0.04]"
        />

      </div>


      {/* Sender */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

        {/* From name */}
        <div>

          <label className="mb-2 block text-sm font-semibold text-[#30343a]">
            From name
          </label>

          <input
            type="text"
            value={form.fromName ?? ""}
            placeholder="Mohit"
            onChange={(e) =>
              onChange(
                "fromName",
                e.target.value
              )
            }
            className="h-11 w-full rounded-lg border border-[#dfe2e7] px-3.5 text-sm outline-none transition focus:border-[#9da3ad] focus:ring-4 focus:ring-black/[0.04]"
          />

        </div>


        {/* From email */}
        <div>

          <label className="mb-2 block text-sm font-semibold text-[#30343a]">
            From email
          </label>

          <input
            type="email"
            value={form.fromEmail ?? ""}
            placeholder="mohit@example.com"
            onChange={(e) =>
              onChange(
                "fromEmail",
                e.target.value
              )
            }
            className="h-11 w-full rounded-lg border border-[#dfe2e7] px-3.5 text-sm outline-none transition focus:border-[#9da3ad] focus:ring-4 focus:ring-black/[0.04]"
          />

        </div>

      </div>


      {/* Jurisdictions */}
      <div className="mb-6">

        <JurisdictionSelector
          selected={form.jurisdictions ?? []}
          onChange={(value) =>
            onChange(
              "jurisdictions",
              value
            )
          }
        />

      </div>


      {/* CASL Consent */}
      {caslSelected && (

        <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-[#f7f8fa] p-4">

          <label className="flex cursor-pointer items-start gap-3">

            <input
              type="checkbox"
              checked={Boolean(form.consent)}
              onChange={(e) =>
                onChange(
                  "consent",
                  e.target.checked
                )
              }
              className="mt-0.5 h-4 w-4 rounded"
            />

            <div>

              <p className="text-sm font-semibold text-[#30343a]">
                Recipient consent is available
              </p>

              <p className="mt-1 text-xs leading-5 text-[#737780]">
                Confirm that you have the appropriate
                consent to send this commercial message
                under CASL.
              </p>

            </div>

          </label>

        </div>
      )}


      {/* Content */}
      <div className="mb-6">

        <div className="mb-2 flex items-center justify-between">

          <label className="text-sm font-semibold text-[#30343a]">
            Email HTML / Content
          </label>

          <span className="text-xs text-[#9a9fa7]">
            {(form.content ?? "").length} characters
          </span>

        </div>


        <textarea
          value={form.content ?? ""}
          placeholder="Paste your email HTML here..."
          onChange={(e) =>
            onChange(
              "content",
              e.target.value
            )
          }
          className="min-h-[280px] w-full resize-y rounded-lg border border-[#dfe2e7] p-3.5 font-mono text-xs leading-6 outline-none transition placeholder:text-[#a4a9b1] focus:border-[#9da3ad] focus:ring-4 focus:ring-black/[0.04]"
        />

      </div>


      {/* Error */}
      {error && (

        <div className="mb-5 rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-700">
          {error}
        </div>

      )}


      {/* Submit */}
      <button
        type="button"
        disabled={loading}
        onClick={onSubmit}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#17181a] text-sm font-semibold text-white transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
      >

        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Analyzing email...
          </>
        ) : (
          <>
            Analyze Email
            <span>→</span>
          </>
        )}

      </button>

    </div>
  );
};

export default EmailForm;