import PatientAIAlert from '../HeartRisk/PatientAIAlert';
import PatientNextStep from '../PatientNextStep/PatientNextStep';

const LifestyleSurveyResults = () => {
  return (
    <section className="mt-16 flex flex-col items-center justify-center w-full space-y-12" aria-label="Results">
      <aside className="w-full p-5 flex justify-center">
        <PatientAIAlert />
      </aside>

      <aside className="w-full p-5 flex justify-center">
        <PatientNextStep />
      </aside>
    </section>
  );
};

export default LifestyleSurveyResults;
