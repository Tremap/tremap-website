import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old Wix URLs that have no page of their own on the new site
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/copy-of-labelling", destination: "/contact?topic=development", permanent: true },
      { source: "/members", destination: "/", permanent: true },
      { source: "/groups", destination: "/", permanent: true },
      { source: "/forum", destination: "/", permanent: true },
      { source: "/forum/:path*", destination: "/", permanent: true },
      { source: "/group/:path*", destination: "/", permanent: true },
      { source: "/profile/:path*", destination: "/about", permanent: true },
      { source: "/blog/page/:n", destination: "/blog", permanent: true },
      { source: "/blog-feed.xml", destination: "/blog", permanent: false },
      { source: "/post/tremap-x-theo-crutchley-mack", destination: "/post/tremap-x-theo-cruthley-mack", permanent: true },
      { source: "/_files/ugd/943aed_afe327042f034ce0a2e96782c1fdce83.pdf", destination: "/files/greenspaces-brochure-2023.pdf", permanent: true },
      { source: "/_files/ugd/943aed_eda160a3190b4c8e9a73d4a14031ad22.pdf", destination: "/files/greenspaces-technical-description-2023.pdf", permanent: true },
      { source: "/_files/ugd/943aed_39e05a98d47144b1a62692d50e534e3e.pdf", destination: "/files/trebg-collection-management.pdf", permanent: true },
      { source: "/_files/ugd/943aed_b8a076ebd9e347c1ba7a62d720a84987.pdf", destination: "/files/tremap-virtual-labelling-for-private-gardens.pdf", permanent: true },
      { source: "/_files/archives/943aed_76c2fc29473f41a08827d12affbfee70.zip", destination: "/files/tremap-app-screenshots.zip", permanent: true },
      { source: "/_files/archives/943aed_88dfb8b74d40440298839ef3a9b262ce.zip", destination: "/files/tremap-team.zip", permanent: true },
      { source: "/_files/archives/943aed_b91c841d7c6845e4a9a805136c06d70c.zip", destination: "/files/tremap-logo.zip", permanent: true },
    ];
  },
};

export default nextConfig;
