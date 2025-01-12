import Card from "./Card";

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold">Men Outfits</h2>
            <p className="mt-2 mb-4">Search Men and Boy outfits</p>
            <a
              href="#"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800"
            >
              Browse men
            </a>
          </Card>

          <Card bg="bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-100">Women Outfits</h2>
            <p className="mt-2 mb-4 text-gray-100">
              Search Women and girl outfits
            </p>
            <a
              href="#"
              className="inline-block bg-gray-200 text-black rounded-lg px-4 py-2 hover:bg-gray-400"
            >
              Browse Women
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
