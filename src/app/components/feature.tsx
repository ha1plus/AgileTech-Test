import { title } from "process"

export default function Fearture() {
  const featureData = [
    {
      title: "Search Data",
      description: "Don’t worry if your data is very large, the Data Warehouse provides a search engine which is useful for making it easier to find data effectively saving time.",
    },
    {
      title: "24 Hours Access",
      description: "Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.",
    },
    {
      title: "Print Out",
      description: "Print out service gives you convenience if someday you need print data, just edit it all and just print it.",
    },
    {
      title: "Security Code",
      description: "Data Security is one of our best facilities. Allows for your files to be safer. You don’t need to worry about information security.",
    },
  ]
    return (
      <section className="container mx-auto">
        <div className="text-center xl:mt-[600px] pt-20">
            <h1 className="lg:text-5xl text-[40px] text-2 mb-6 font-bold aos-init aos-animate" data-aos="fade-down" data-aos-delay="400">Features</h1>
            <p className="text-lg text-1 lead xl:max-w-[580px] mx-auto mb-6 lg:mb-12 aos-init aos-animate" data-aos="fade-down" data-aos-delay="500">Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.</p>
        </div>
        <div className="flex flex-row flex-wrap justify-center xl:grid xl:grid-cols-2 gap-8 text-wrap">
          {featureData.map((data, index) => (
            <div key={index} className="flex justify-end items-center xl:block min-h-80 max-w-full">
              <div className="xl:min-h-[380px]">
                <div className="xl:relative">
                  <img src={`/static/media/bg-feature${index+1}.png`} alt="" className="hidden xl:block xl:absolute right-0"/>
                  <div className="xl:absolute xl:right-1/2 xl:top-1/2 xl:transform xl:translate-y-1/2">
                    <img src={`/static/media/feature${index+1}.png`} alt="" className="mx-auto xl:mx-0 block" />
                  </div>
                  <div className="xl:absolute xl:top-16 xl:right-0 px-1 max-w-[360px]">
                    <h3 className="text-2xl font-semibold mb-4 text-2">{data.title}</h3>
                        <p className="text-lg text-1 lead font-extralight">{data.description}</p>
                        <button className="mt-4 xl:mt-14 font-semibold flex">
                          Learn more
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-3 ml-4">
                            <path d="M4 12H20M14 6L20 12L14 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    )
  }
  