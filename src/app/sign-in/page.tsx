import Header from "../components/header";
import SignInForm from "./form";

export default function SignIn() {
  return (
    <main>
      {/* Header */}
      <section className="h-[500px] lg:h-[900px]">
        <Header />
        {/* Sign In Form */}
        <div className="container mx-auto h-full relative">
          <SignInForm />
        </div>
      </section>
    </main>
  );
}
