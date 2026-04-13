import React, { useEffect, useState } from 'react';
import { MdOutlineBloodtype, MdOutlineFavorite } from 'react-icons/md';
import { LuActivity, LuBeer, LuMoonStar } from 'react-icons/lu';
import { FaSmoking, FaUsers } from 'react-icons/fa';
import LifestyleSurveyHeader from '../../components/LifestyleSurvey/LifestyleSurveyHeader';
import LifestyleSurveyResults from '../../components/LifestyleSurvey/LifestyleSurveyResults';
import QuestionSection from '../../components/LifestyleSurvey/QuestionSection';

const PatientLifestyleSurvey = () => {
  const [formData, setFormData] = useState({
    cholesterol: '',
    sleepHours: '',
    smoking: '',
    alcohol: '',
    activity: '',
    prevIssues: '',
    familyHistory: '',
  });

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    document.title = 'Lifestyle Survey | PulseX';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Complete a quick lifestyle survey to assess heart health.');
    }
  }, []);

  const handleSelect = (question, value) => {
    setFormData((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    console.log('Data to be sent to Backend:', formData);
    setShowResults(true);
  };

  return (
    <main
      className="min-h-screen p-[24px] bg-white rounded-full"
      style={{
        "--survey-muted": "rgba(1, 2, 24, 0.8)",
      }}
    >
      <LifestyleSurveyHeader />
      <p className="text-[18px] text-gray-500 mb-10">
        Answer these quick questions about your daily habits to help our AI analyze your heart health baseline.
      </p>

      <section className="flex flex-col gap-10" aria-label="Survey questions">
        <QuestionSection
          icon={<MdOutlineBloodtype className="text-red-500" />}
          label="Cholesterol Level"
          question="Select your latest cholesterol level:"
          options={['Normal (<200 mg/dL)', 'Borderline (200–239 mg/dL)', 'High (≥240 mg/dL)']}
          selected={formData.cholesterol}
          onSelect={(v) => handleSelect('cholesterol', v)}
        />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <QuestionSection
            className="flex-[2] w-full"
            icon={<LuMoonStar className="text-purple-600" />}
            label="Sleep Hours Per Day"
            question="How many hours do you sleep per day?"
            options={['Less than 6 hours', '6–8 hours', 'More than 8 hours']}
            selected={formData.sleepHours}
            onSelect={(v) => handleSelect('sleepHours', v)}
          />
          <QuestionSection
            className="flex-[1] w-full"
            icon={<FaSmoking className="text-gray-500" />}
            label="Smoking"
            question="Do you smoke?"
            options={['Yes', 'No']}
            selected={formData.smoking}
            onSelect={(v) => handleSelect('smoking', v)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <QuestionSection
            icon={<LuBeer className="text-blue-400" />}
            label="Alcohol Consumption"
            question="How often do you drink alcohol?"
            options={['Low', 'Medium', 'High']}
            selected={formData.alcohol}
            onSelect={(v) => handleSelect('alcohol', v)}
          />
          <QuestionSection
            icon={<LuActivity className="text-teal-500" />}
            label="Physical Activity"
            question="How active are you during the week?"
            options={['Low', 'Medium', 'High']}
            selected={formData.activity}
            onSelect={(v) => handleSelect('activity', v)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <QuestionSection
            icon={<MdOutlineFavorite className="text-red-600" />}
            label="Previous Heart Issues"
            question="Have you ever had any heart-related issues before?"
            options={['Yes', 'No']}
            selected={formData.prevIssues}
            onSelect={(v) => handleSelect('prevIssues', v)}
          />
          <QuestionSection
            icon={<FaUsers className="text-stone-600" />}
            label="Family History"
            question="Has anyone in your family had heart-related diseases?"
            options={['Yes', 'No']}
            selected={formData.familyHistory}
            onSelect={(v) => handleSelect('familyHistory', v)}
          />
        </div>

        <div className="flex justify-center pt-4 pb-8 mt-20">
          <button
            className="px-14 py-3.5 rounded-[28px] bg-brand-main hover:bg-[#2830d4] text-white text-[14px] font-semibold shadow-[0_4px_12px_rgba(51,60,245,0.25)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(51,60,245,0.35)] transition-all cursor-pointer"
            onClick={handleSubmit}
          >
            View Results
          </button>
        </div>
      </section>

      {showResults && <LifestyleSurveyResults />}

      <footer className="sr-only">
        <p>End of lifestyle survey page.</p>
      </footer>
    </main>
  );
};

export default PatientLifestyleSurvey;
