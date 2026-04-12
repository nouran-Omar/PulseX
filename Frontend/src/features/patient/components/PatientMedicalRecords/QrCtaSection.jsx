import { motion } from 'framer-motion';
import { RiRocketLine } from 'react-icons/ri';

const QrCtaSection = ({ qrImage }) => {
  return (
    <div className="w-full lg:flex-1 flex flex-col items-center text-center gap-8 max-w-2xl mx-auto py-6 sm:py-10">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-[24px] md:text-[28px] font-bold text-black-main-text flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <motion.img
            src={qrImage}
            alt="QR Icon"
            className="w-20 h-20 object-contain shrink-0"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          All your medical files are ready!
        </h3>

        <div className="flex flex-col gap-2 items-center">
          <p className="text-[17px] text-gray-text-dim2 leading-relaxed">
            Your reports are now organized.
          </p>
          <p className="text-[17px] text-gray-text-dim2 leading-relaxed font-medium">
            Generate your personal QR code to access them anytime.
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto relative cursor-pointer flex items-center justify-center gap-3 rounded-4xl px-10 py-4 text-[15px] font-bold text-white shadow-lg overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #2B7FFF, #E7000B)',
          boxShadow: '0px 10px 20px rgba(43, 127, 255, 0.2)',
        }}
      >
        <motion.div
          variants={{
            tap: {
              x: 100,
              y: -100,
              opacity: 0,
              transition: { duration: 0.8, ease: 'easeIn' },
            },
          }}
          whileTap="tap"
        >
          <RiRocketLine className="text-xl" />
        </motion.div>

        <span className="relative z-10">Generate QR Code</span>

        <motion.span
          className="text-lg"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </motion.button>
    </div>
  );
};

export default QrCtaSection;
