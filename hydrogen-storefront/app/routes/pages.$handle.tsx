import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const page = data?.page;
  return [
    {title: `${page?.title || 'Page'} | Daily Loom`},
    {name: 'description', content: page?.bodySummary || 'Daily Loom - Premium handloom textiles'},
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Page not found', {status: 404});
  }

  const {page} = await storefront.query(PAGE_QUERY, {
    variables: {handle},
  });

  if (!page) {
    throw new Response('Page not found', {status: 404});
  }

  return {page};
}

export default function PageRoute() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <div className="pt-[44px]">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#FFF9F3]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="max-w-2xl fade-in-up">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-[#6B8E72] mb-4 font-medium">
              Daily Loom
            </span>
            <h1 className="font-['Playfair_Display'] text-[clamp(32px,5vw,48px)] text-[#1A1A1A] mb-4 font-light leading-tight">
              {page.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <div
            className="prose prose-lg prose-neutral max-w-none fade-in-up delay-200"
            dangerouslySetInnerHTML={{__html: page.body}}
            style={{
              '--tw-prose-body': '#2B2B2B',
              '--tw-prose-headings': '#1A1A1A',
              '--tw-prose-links': '#6B8E72',
            } as React.CSSProperties}
          />
        </div>
      </section>
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page($handle: String!) {
    page(handle: $handle) {
      id
      title
      handle
      body
      bodySummary
      seo {
        title
        description
      }
    }
  }
`;
