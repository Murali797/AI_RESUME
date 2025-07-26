import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);
  return (
    <div className="flex justify-center items-center py-6">
      <Link
        to={`/resume/${id}`}
        className="w-full max-w-md bg-white min-h-[300px] shadow-xl rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200"
      >
        <div className="flex flex-row justify-between h-full space-y-4 items-center">
          <div className='flex flex-col '>
            <h3 className="text-xl font-bold text-indigo-600 mb-1">{companyName}</h3>
            <p className="text-gray-500">{jobTitle}</p>
             {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
          </div>
          <div className="flex justify-center text-black">
            <ScoreCircle score={feedback.overallScore} />
          </div>
        </div>
         {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                    </div>
                </div>
                )}
      </Link>
    </div>
  )
}

export default ResumeCard
