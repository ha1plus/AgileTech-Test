import Navigation from "../profile/navigation";

 
export default function DashBoardLayout({ children }: any) {
  return (
    <main>
        <section className="min-h-screen flex flex-col lg:flex-row">
          <Navigation/>

          {/* Main Content */}
          {children}
        </section>
    </main>
  )
}
