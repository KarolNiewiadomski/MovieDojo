/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const Hero = ({
  title = "TV Series",
  subtitle = "Browse popular and top rated TV Series and add them to your WatchList.",
}) => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-950 py-24 sm:py-32 drop-shadow-md">
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          {/* Animated Title */}
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              duration: 0.8,
            }}
            className="text-5xl font-semibold tracking-tight text-gray-300 sm:text-7xl"
          >
            {title}
          </motion.h2>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
            }}
            className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
