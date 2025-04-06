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
  {type: "article", title: "Want to Buy a House in 2025?", url: "https://realestate.usnews.com/real-estate/articles/how-to-buy-a-house", images:["https://www.usnews.com/object/image/00000195-8b30-d527-a5b7-cf70addc0000/gettyimages-1769097467.jpg?update-time=1741797015416&size=responsive970"]},
  {type: "article", title: "Tips for First-Time Home Buyers", url: "https://www.nerdwallet.com/article/mortgages/tips-for-first-time-home-buyers", images:["https://www.nerdwallet.com/tachyon/2018/05/GettyImages-1191112223.jpg?resize=1920%2C1152"]},
  {type: "article", title: "Housing help", url: "https://www.usa.gov/housing-help", images:["https://www.wpb.org/files/assets/city/v/1/housing/images/housing-header.jpg?dimension=pageimagefullwidth&w=1140"]},
  {type: "article", title: "How To Buy a House: A Step-by-Step Guide", url: "https://www.investopedia.com/updates/first-time-home-buyer/", images:["https://www.investopedia.com/thmb/1khfxPzvjeiOAbEE6_QtOhv2XQQ=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LeadImage-first-time-home-buyer-v12-58a9c0ab45424243987ac60002d74587.png"]},
  {type: "article", title: "Home Improvement Loans", url: "https://realestate.usnews.com/real-estate/articles/what-to-know-about-home-improvement-loans", images:["https://www.usnews.com/object/image/00000196-0217-d19f-af97-221795850000/gettyimages-2180026160.jpg?update-time=1743792098595&size=responsive970"]},
  {type: "article", title: "Fixer-Upper vs. Move-in Ready", url:"https://realestate.usnews.com/real-estate/articles/buying-a-fixer-upper-vs-buying-new-which-is-better", images: ["https://www.usnews.com/object/image/00000195-c8fc-d22c-a3d7-e9ff90a00000/gettyimages-2196112634.jpg?update-time=1742833807083&size=responsive970"]}
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
        {card.images.map((image, i) => (
          <div key={i} className="relative h-full">
            <a href={card.url} target="_blank">
                <img
                  src={image}
                  alt="Clickable Image"
                  className="hover:opacity-75 transition duration-300 w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 flex items-center overflow justify-center bg-black/50 text-white text-lg font-bold px-2 text-center rounded-md">
                  {card.title}
                </div>
              </a>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function Finance() {

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold text-stone-900 font-montserrat">Housing Tips and Advices</h1>
      </section>

      {/* Video Scroll Section */}
      <section className="pb-16 px-16 relative fix items-left mini" style={{backgroundColor: '#f0e1d8'}}>
        <h2 className="text-4xl font-extrabold text-center text-black font-montserrat mb-8 pt-12">Videos</h2>
        <div className="w-full h-full flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth gap-6 justify-start">
          {cards.filter(card => card.type === 'video').map((card, i) => (
            <div key={i} className="min-w-[20rem] h-72 bg-stone-700 rounded-[10px] shadow-md flex-shrink-0 cursor-pointer hover:scale-105 ease-in-out duration-300">
              <CardContent card={card} />
            </div>
          ))}
        </div>
      </section>

      <div className="py-8"></div>

      {/* Articles Scroll Section (If you had article cards) */}
      <section className="py-16 px-16" style={{backgroundColor: '#f0e1d8'}}>
        <h2 className="text-4xl font-extrabold text-center text-black font-montserrat mb-8">Articles</h2>
        <div className="flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth gap-6 justify-start">
          {cards.filter(card => card.type === 'article').map((card, i) => (
            <div key={i} className="min-w-[20rem] h-72 bg-stone-300 rounded-[10px] shadow-md flex-shrink-0 cursor-pointer hover:scale-105 ease-in-out duration-300">
              <CardContent card={card} />
            </div>
          ))}
        </div>
      </section>

      <div className="py-4"></div>

    </div>
  );
}

export default Finance;
