import { type FormEvent, useState } from 'react';
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText('Uploading the file...');
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText('Error: Failed to upload file');

    setStatusText('Converting to image...');
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

    setStatusText('Uploading the image...');
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText('Error: Failed to upload image');

    setStatusText('Preparing data...');
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: '',
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analyzing...');
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackText = typeof feedback.message.content === 'string'
      ? feedback.message.content
      : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analysis complete, redirecting...');
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/assets/public/images/bg-main.svg')] bg-cover bg-no-repeat bg-center min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl bg-white/40 backdrop-blur-xl rounded-3xl p-12 shadow-2xl flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-green-700 mb-4 text-center">
            Smart Resume Feedback Engine
          </h1>

          {isProcessing ? (
            <>
              <h2 className="text-lg text-gray-900 mb-6 text-center font-medium animate-pulse">
                {statusText}
              </h2>
              <img
                src="/assets/public/images/resume-scan.gif"
                alt="Scanning..."
                className="w-3/4 max-w-lg mx-auto rounded-xl shadow-lg"
              />
            </>
          ) : (
            <>
              <h2 className="text-base text-gray-800 text-center mb-6 max-w-xl">
                Upload your resume and get instant feedback tailored to your dream job.
              </h2>

              <form
  id="upload-form"
  onSubmit={handleSubmit}
  className="w-full flex flex-col items-center justify-center gap-6 mt-10"
>
  <div className="w-full max-w-2xl mx-auto">
    <label htmlFor="company-name" className="block mb-2 text-sm font-medium text-gray-800">
      Company Name
    </label>
    <input
      type="text"
      name="company-name"
      id="company-name"
      placeholder="e.g., Google"
      className="w-full p-4 rounded-xl border border-gray-300 shadow-md text-black focus:ring-4 focus:ring-green-400 focus:outline-none"
    />
  </div>

  <div className="w-full max-w-2xl mx-auto">
    <label htmlFor="job-title" className="block mb-2 text-sm font-medium text-gray-800">
      Job Title
    </label>
    <input
      type="text"
      name="job-title"
      id="job-title"
      placeholder="e.g., Software Engineer"
      className="w-full p-4 rounded-xl border border-gray-300 shadow-md text-black focus:ring-4 focus:ring-green-400 focus:outline-none"
    />
  </div>

  <div className="w-full max-w-2xl mx-auto">
    <label htmlFor="job-description" className="block mb-2 text-sm font-medium text-gray-800">
      Job Description
    </label>
    <textarea
      rows={6}
      name="job-description"
      id="job-description"
      placeholder="Paste the job description here..."
      className="w-full p-4 rounded-xl border border-gray-300 shadow-md text-black focus:ring-4 focus:ring-green-400 focus:outline-none resize-none"
    />
  </div>

  <div className="w-full max-w-2xl mx-auto">
    <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-800">
      Upload Resume
    </label>
    <FileUploader onFileSelect={handleFileSelect} />
  </div>

  <button
    type="submit"
    className="cursor-pointer w-full max-w-2xl mx-auto bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-bold text-xl shadow-md hover:from-green-600 hover:to-blue-600 transition-all duration-300"
  >
    🚀 Analyse My Resume
  </button>
</form>

            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
