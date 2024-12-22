import EventDetails from "@/components/details/EventDetails";
import EventMap from "@/components/details/EventMap";
import HeroSection from "@/components/details/HeroSection";
import { getAllEventById } from "@/db/queries";

export async function generateMetaData({ params: { id } }) {
  const eventInfo = await getAllEventById(id);
  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      images: [eventInfo?.imageUrl],
    },
  };
}

export default async function EventDetailsPage({ params: { id } }) {
  const eventInfo = await getAllEventById(id);

  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={eventInfo?.details} swags={eventInfo?.swags} />
          <EventMap location={eventInfo?.location} />
        </div>
      </section>
    </>
  );
}
