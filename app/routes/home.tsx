import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) =>
        JSON.parse(resume.value) as Resume
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
   <main className="min-h-screen w-full bg-gradient-to-br from-[#0f0f1b] via-[#091c29] to-[#00151e] text-white">


      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 py-16">
        <div className="max-w-3xl">
       <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-cyan-400 animate-pulse"
     style={{
       textShadow: '0 0 30px rgba(34,211,238,0.9), 0 0 60px rgba(34,211,238,0.6)',
       color: '#22d3ee',
       backgroundColor: 'rgba(0,0,0,0.3)',
       padding: '0.5rem 1rem',
       borderRadius: '0.5rem'
     }}>
  Track Your Applications & Resume Ratings
</h1>



          {!loadingResumes && resumes?.length === 0 ? (
            <h2 className="text-lg text-gray-600 mt-2">
              No resumes found. Upload your first resume to get feedback.
            </h2>
          ) : (
            <h2 className="text-lg text-white mt-2">
              Review your submissions and check AI-powered feedback.
            </h2>
          )}
        </div>

        {loadingResumes && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <img
              src="/assets/public/images/resume-scan-2.gif"
              alt="Scanning Resume"
              className="w-48 drop-shadow-xl"
            />
            <p className="text-sm text-gray-500 animate-pulse">
              Scanning your resumes...
            </p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl px-4">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="mt-14 flex flex-col items-center gap-4">
            <Link
              to="/upload"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md transition"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
