export default function CareersPage() {
  return (
    <div className="py-24 px-6 bg-white text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-5xl font-normal font-poppins">Join us. Be ASPIRE.</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
          Let&apos;s make good impact to the world. Let&apos;s achieve our aspirations.
        </p>
        <p className="text-gray-500 max-w-lg mx-auto">
          Whatever your education background or your expertise is, we welcome your pure self to join us.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-400 font-medium">Email your CV or resume to:</p>
          <a
            href="mailto:career@aspire.id"
            className="inline-flex px-8 py-3.5 bg-brand-black text-white font-normal tracking-wider uppercase hover:bg-brand-primary transition rounded"
          >
            Join Now
          </a>
          <a href="mailto:career@aspire.id" className="text-brand-primary font-normal hover:underline text-sm">
            career@aspire.id
          </a>
        </div>
      </div>
    </div>
  );
}
