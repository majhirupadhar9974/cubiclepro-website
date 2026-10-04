import Link from "next/link";
import { locations } from "@/data/site-content";
import { metadata } from "@/lib/seo";
import { getPublishedLocations } from "@/lib/cms";

export const generateMetadata = () =>
  metadata(
    "Toilet Partitions & Restroom Cubicles Across India",
    "Explore CubiclePro city pages for toilet partitions, restroom cubicles, washroom partitions, UMPs, HPL lockers and commercial washroom enquiries.",
    "/locations/",
  );

export default async function Locations() {
  const cms=await getPublishedLocations();
  const items=cms.length?cms.map((item)=>{const fallback=locations.find((entry)=>entry.slug===item.slug.current);return{city:item.city,slug:item.slug.current,region:fallback?.region||"Other"};}):locations;
  const regions = [...new Set(items.map((item) => item.region))];

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="cp-kicker">India project enquiries</p>
          <h1>Toilet partitions and restroom cubicles across India.</h1>
          <p className="lede">
            Explore {items.length} city-specific enquiry pages for commercial washroom
            cubicles, partitions, privacy panels and lockers.
          </p>
        </div>
      </header>
      <section className="cp-section">
        <div className="container">
          {regions.map((region) => (
            <section key={region} className="location-group">
              <h2>{region}</h2>
              <div className="city-list">
                {items
                  .filter((item) => item.region === region)
                  .map((item) => (
                    <Link href={`/locations/${item.slug}/`} key={item.slug}>
                      {item.city}
                      <span>Explore ↗</span>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
