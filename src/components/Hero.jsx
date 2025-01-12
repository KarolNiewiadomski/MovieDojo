/* eslint-disable react/prop-types */
const Hero = ({
  title = "Winter Deals!",
  subtitle = "Search most popular brand sales, for winter sports equipment, get your fit here. Save your time and money!",
}) => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 drop-shadow-md">
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu "></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            {title}
          </h2>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
