 export default function Banner() {
  return (
    <section className="container mx-auto h-full md:py-4 relative">
        <div className="text-center xl:text-left xl:absolute">
            <h1 className="lg:text-7xl text-[40px] text-2 mb-6 font-bold aos-init aos-animate" data-aos="fade-down" data-aos-delay="400">Save your data  <span className="hidden xl:inline"><br /></span>  storage here.</h1>
            <p className="text-lg text-1 lead xl:max-w-[380px] mb-6 lg:mb-12 aos-init aos-animate" data-aos="fade-down" data-aos-delay="500">Data Warehouse is a data storage area that has been tested for security, so you can store your data here safely but not be afraid of being stolen by others.</p>
            <button className="btn btn-primary mb-8 xl:mb-0 aos-init" data-aos="fade-down" data-aos-delay="600">Learn more</button>
        </div>
        <div className="xl:absolute lg:left-1/3">
            <img src="/static/media/banner.png" alt="" className="w-full lg:w-[1000px]"/>
        </div>
    </section>
  )
}
