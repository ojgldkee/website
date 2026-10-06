import { ContactForm } from "@/components/contact";
import { PageIntro } from "@/components/ui";
export const metadata = { title: "Contact" };
export default function Page() {
  return (
    <div className="container page-space">
      <PageIntro eyebrow="GET IN TOUCH" title="We’re here to help." />
      <ContactForm />
    </div>
  );
}
