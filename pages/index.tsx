import Head from "next/head";
import BillOfMaterials from "@/components/site/BillOfMaterials";
import DrawnBy from "@/components/site/DrawnBy";
import ExistingConditions from "@/components/site/ExistingConditions";
import Footer from "@/components/site/Footer";
import GeneralArrangement from "@/components/site/GeneralArrangement";
import GeneralNotes from "@/components/site/GeneralNotes";
import Issue from "@/components/site/Issue";
import IssueSequence from "@/components/site/IssueSequence";
import IssuedSheets from "@/components/site/IssuedSheets";
import ScheduleOfWorks from "@/components/site/ScheduleOfWorks";
import SectionThroughSystem from "@/components/site/SectionThroughSystem";
import SetIndex from "@/components/site/SetIndex";
import SmoothScroll from "@/components/site/SmoothScroll";
import Seo from "@/components/Seo/Seo";
import { BRAND, HERO } from "@/json/site/content";

const SITE_URL = "https://www.synkinnovations.in";

/**
 * The page is one drawing set, read front to back. This file only decides the
 * order the sheets are bound in; each sheet is its own component, and the order
 * is the argument: what is there, what is wrong with it, what we would do,
 * what we would build it from, what we have built, how, in what shape, to what
 * standard, by whom, and then the stamp that releases it.
 */
export default function Home() {
  return (
    <>
      <Seo
        title={`${BRAND.name} — We build what comes next`}
        description={HERO.lede}
        canonical={SITE_URL}
        url={SITE_URL}
        siteName={BRAND.name}
        image={`${SITE_URL}/og.png`}
      />
      <Head>
        <meta name="theme-color" content="#D6D2E2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SmoothScroll />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-plate focus:px-5 focus:py-3 focus:text-sm focus:text-knock"
      >
        Skip to content
      </a>

      <SetIndex />

      <main id="main">
        <GeneralArrangement />
        <ExistingConditions />
        <ScheduleOfWorks />
        <BillOfMaterials />
        <IssuedSheets />
        <IssueSequence />
        <SectionThroughSystem />
        <GeneralNotes />
        <DrawnBy />
        <Issue />
      </main>

      <Footer />
    </>
  );
}
