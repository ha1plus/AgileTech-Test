export default function Footer() {
    return (
      <section className="container mx-auto border-t-2 border-opacity-20" style={{ borderColor: '#9C69E2' }}>
          <div className="flex flex-col xl:flex-row text-center xl:text-left gap-y-12 mt-24">
            <div className="w-[45%] mx-auto flex flex-col items-center xl:items-start">
                <a href="#" className="flex items-center mb-[65px]">
                    <img src="/logo.png" alt="" />
                    <p className="ml-6 text-xl font-bold text-2">DataWarehouse</p>
                </a>
                <div className="max-w-[260px] mb-5 text-primary font-bold text-2">
                    <p >Warehouse Society, 234 Bahagia Ave Street PRBW 29281</p>
                </div>
                <div className="font-light italic text-1">
                    info@warehouse.project
                </div>
                <div className="font-light italic text-1">
                    1-232-3434 (Main)
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-y-14 xl:flex-row justify-between">
                <div>
                    <div className="font-extrabold text-primary mb-8">
                        About
                    </div>
                    <ul className="flex flex-col gap-y-4"> 
                        <li><a href="#" className="text-primary">Profile</a></li>
                        <li><a href="#" className="text-primary">Features</a></li>
                        <li><a href="#" className="text-primary">Careers</a></li>
                        <li><a href="#" className="text-primary">DW News</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-extrabold text-primary mb-8">
                        Help
                    </div>
                    <ul className="flex flex-col gap-y-4"> 
                        <li><a href="#" className="text-primary">Support</a></li>
                        <li><a href="#" className="text-primary">Sign Up</a></li>
                        <li><a href="#" className="text-primary">Guide</a></li>
                        <li><a href="#" className="text-primary">Reports</a></li>
                        <li><a href="#" className="text-primary">Q & A</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-extrabold text-primary mb-8">
                        Social Media
                    </div>
                    <ul className="flex flex-col gap-y-4"> 
                        <li><a href="#" className="text-primary">Facebook</a></li>
                        <li><a href="#" className="text-primary">Twitter</a></li>
                        <li><a href="#" className="text-primary">Instagram</a></li>
                        <li><a href="#" className="text-primary">Linkedin</a></li>
                    </ul>
                </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-center md:text-left text-1  lg:flex-row justify-between gap-y-8 mt-16">
            <div className="text-sm font-light italic max-w-[360px]">
            © Datawarehouse™, 2020. All rights reserved. Company Registration Number: 21479524.
            </div>
            <div className="-order-1 md:order-1">
                <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-accent-primary/20 cursor-pointer group">
                    <div className="text-3xl text-accent-primary group-hover:scale-110 transition-all bg-3/50 rounded-full p-2 flex items-center justify-center">
                        <svg width="35" height="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-3">
                            <path d="M21 11.5C21 7.08172 16.9706 3 12 3C7.02944 3 3 7.08172 3 11.5C3 13.2121 3.69191 14.7911 4.86402 16.0014C4.56142 17.1043 3.9396 18.5737 3 19C5.02841 18.7887 6.23009 17.7895 7.00173 17.0005C7.80254 17.3274 8.79257 17.5 9.82068 17.5H12C16.9706 17.5 21 13.9183 21 11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="8" cy="11.5" r="1.5" fill="currentColor"/>
                            <circle cx="12" cy="11.5" r="1.5" fill="currentColor"/>
                            <circle cx="16" cy="11.5" r="1.5" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
            </div>
          </div>
      </section>
    )
  }
  