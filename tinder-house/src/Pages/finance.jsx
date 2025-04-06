import React from 'react';
import ReactPlayer from 'react-player';

const cards = [
  {type: "video", title: "FHA Loan vs Conventional Loans (Mortgage)", url: "https://www.youtube.com/watch?v=NxRok2ADuQg"},
  {type: "video", title: "10 Things You MUST Know Before Buying A House", url: "https://www.youtube.com/watch?v=pM-IjYlKozE"},
  {type: "video", title: "What They Don't Tell You About Buying Your First House", url: "https://www.youtube.com/watch?v=IzXqDVlCsCo"},
  {type: "video", title: "What To Look Out For When Buying A House", url: "https://www.youtube.com/watch?v=4UZtbz35XJo"},
  {type: "video", title: "Home Mortgages 101", url: "https://www.youtube.com/watch?v=mU69g6Ao47A"},
  {type: "video", title: "Top 10 Home Essentials for New Homeowners", url: "https://www.youtube.com/watch?v=8IncGvwQPsg"},
  {type: "video", title: "11 Things to Do After You Close on Your Home", url: "https://www.youtube.com/watch?v=VQ6OmSVd0aM"},
  {type: "video", title: "Mistakes First-Time Home Buyers Make", url: "https://www.youtube.com/watch?v=yIGgL-6jyC4"},
  {type: "video", title: "How to Buy A House", url: "https://www.youtube.com/watch?v=fBP2E8J6SZ0"},
  {type: "video", title: "Buying a home in 3 MONTHS? Here's Your Gameplan", url: "https://www.youtube.com/watch?v=AiXb_c9kmM8"},
  {type: "article", title: "Want to Buy a House in 2025? Follow these 14 Steps", images:["https://www.usnews.com/object/image/00000195-8b30-d527-a5b7-cf70addc0000/gettyimages-1769097467.jpg?update-time=1741797015416&size=responsive970"]}
];

function CardContent({ card }) {
  if (card.type === "video") {
    return (
      <div className="flex flex-col h-full">
        <div className="aspect-video h-full">
          <ReactPlayer url={card.url} width="100%" height="100%" controls />
        </div>
      </div>
    );
  }

  if (card.type === "article") {
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
        <div className="w-36 h-full flex overflow-x-auto gap-6"></div>
          {card.images.map((image, i) => (
            <img key={i} src={image} alt={`article-image-${i}`} className="h-full object-cover rounded-md shadow-md" />
          ))}
      </div>
    )
  }

  return null;
}

function Finance() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold text-stone-900 font-montserrat">Learn About Finances</h1>
      </section>

      {/* Video Scroll Section */}
      <section className="pb-16 px-16 relative fix items-left">
        <h2 className="text-4xl font-extrabold text-center text-black font-montserrat mb-8">Videos</h2>
        <div className="w-full h-full flex overflow-x-auto gap-6 justify-start">
          {cards.filter(card => card.type === 'video').map((card, i) => (
            <div key={i} className="min-w-[20rem] h-72 bg-stone-700 rounded-[10px] shadow-md flex-shrink-0">
              <CardContent card={card} />
            </div>
          ))}
        </div>
      </section>

      {/* Articles Scroll Section (If you had article cards) */}
      <section className="py-16 px-4">
        <h2 className="text-4xl font-extrabold text-center text-black font-montserrat mb-8">Articles</h2>
        <div className="flex overflow-x-auto gap-6 justify-center">
          {cards.filter(card => card.type === 'article').map((card, i) => (
            <div key={i} className="w-96 h-72 bg-stone-300 rounded-[10px] shadow-md flex-shrink-0">
              <CardContent card={card} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Finance;
