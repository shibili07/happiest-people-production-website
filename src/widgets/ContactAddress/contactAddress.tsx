import React from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Icons from "@/utils/icons";
import { twc } from "@/utils";
import { defaultContactPage } from "@/lib/cms/defaults";
import type { ContactPageData } from "@/lib/cms/types";

interface ContactAddressProps {
  contact?: ContactPageData["contact"];
  mapEmbedUrl?: ContactPageData["mapEmbedUrl"];
}

const ContactAddress = ({
  contact = defaultContactPage.contact,
  mapEmbedUrl = defaultContactPage.mapEmbedUrl,
}: ContactAddressProps) => {
  return (
    <section
      data-widget="contact-address"
      className={`contact-address ${twClasses.section}`}
    >
      <Container>
        <div className={`contact-address__grid ${twClasses.grid}`}>
          <div className={twClasses.details}>
            <div className="location">
              <h2 className={twClasses.label}>Location Address</h2>
              <address className={`contact-adrress ${twClasses.address}`}>
                {contact.address.map((line, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && " "}
                    {line}
                  </React.Fragment>
                ))}
              </address>

              {contact.mapUrl && (
                <Button
                  text="Get direction"
                  icon={<Icons.ChevronRight className="h-3 mt-px" />}
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined-with-icon"
                  color="white"
                  className="mt-10 w-max rounded-full 2xl:h-[60px] 2xl:min-w-[230px]"
                  textClass="font-medium 2xl:text-lg"
                />
              )}
            </div>

            <div className="email-and-phone lg:mt-20 mt-12 2xl:mt-[100px]">
              <h2 className={twClasses.label}>Phone / Email</h2>
              {contact.phone && (
                <p className={twClasses.phone}>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="hover:underline"
                  >
                    {contact.phone}
                  </a>
                  {contact.phoneNote && (
                    <span className="text-[#c1bebe] md:whitespace-nowrap">
                      {" "}
                      ( {contact.phoneNote} )
                    </span>
                  )}
                </p>
              )}
              <p className={twClasses.email}>
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className={`contact-address__map ${twClasses.map}`}>
            <iframe
              src={mapEmbedUrl}
              title="Map showing the Happiest People Productions studio"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactAddress;

const twClasses = twc({
  section: "bg-black text-white lg:pb-32 pb-16 2xl:pb-[260px]",
  grid: "mx-auto grid max-w-[1402px] items-center gap-10 lg:grid-cols-[minmax(0,655fr)_minmax(0,604fr)] lg:gap-[10%]",
  details: "min-w-0",
  map: "relative aspect-[604/628] w-full max-w-[604px] overflow-hidden border border-white/10 bg-[#f5f5f5] max-lg:mx-auto lg:ml-auto",
  label: "ff-manrope text-xl text-[#c1bebe] md:text-2xl 2xl:text-[30.5px]",
  address:
    "ff-manrope mt-6 block not-italic text-xl leading-[1.7] text-white [overflow-wrap:anywhere] md:text-2xl 2xl:mt-[50px] 2xl:text-[30.5px] 2xl:leading-[52px]",
  phone:
    "ff-manrope mt-6 text-xl text-white md:text-2xl 2xl:mt-[50px] 2xl:text-[28.5px] 2xl:leading-[52px]",
  email:
    "ff-manrope mt-2 text-lg text-white [overflow-wrap:anywhere] md:text-xl 2xl:text-[26px]",
});
